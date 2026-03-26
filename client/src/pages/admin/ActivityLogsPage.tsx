import React, { useMemo, useState } from 'react';
import { Search, Download, ScrollText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import PageHeader from '@/components/common/PageHeader';
import { StatusBadge } from '@/components/common/StatusBadge';
import EmptyState from '@/components/common/EmptyState';
import ErrorState from '@/components/common/ErrorState';
import { formatDateTime, formatRelativeTime, getInitials } from '@/utils/helpers';
import { toast } from '@/hooks/use-toast';
import { activityLogKeys, adminActivityLogService } from '@/services/admin/activity-log.service';
import { useDebounce } from '@/hooks/useDebounce';
import type { ActivityLogResource } from '@/types/activity-log.types';
import { useQuery } from '@tanstack/react-query';

const RESOURCES: ActivityLogResource[] = ['Auth', 'Todos', 'Users', 'Roles', 'Permissions', 'Settings', 'Logs', 'Tags', 'Profile'];

const ActivityLogsPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [resourceFilter, setResourceFilter] = useState('all');
  const [page, setPage] = useState(1);
  const perPage = 15;

  const debouncedSearch = useDebounce(search, 400);
  const params = useMemo(() => ({
    page,
    limit: perPage,
    search: debouncedSearch || undefined,
    status: statusFilter === 'all' ? undefined : statusFilter,
    resource: resourceFilter === 'all' ? undefined : resourceFilter,
  }), [page, perPage, debouncedSearch, statusFilter, resourceFilter]);

  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: activityLogKeys.list(params),
    queryFn: () => adminActivityLogService.list(params),
  });

  const logs = data?.data ?? [];
  const meta = data?.meta;
  const totalEntries = meta?.total ?? 0;
  const totalPages = meta?.lastPage ?? 1;

  const handleExport = async () => {
    try {
      const result = await adminActivityLogService.export({
        search: debouncedSearch || undefined,
        status: statusFilter === 'all' ? undefined : statusFilter,
        resource: resourceFilter === 'all' ? undefined : resourceFilter,
      });
      const csv = [
        'ID,User,Action,Resource,Details,IP,Status,Timestamp',
        ...result.data.map(l =>
          `${l.id},"${l.userName ?? ''}","${l.action}","${l.resource}","${(l.description ?? '').replace(/"/g, '""')}","${l.ip ?? ''}","${l.status}","${l.createdAt}"`
        ),
      ].join('\n');
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'activity-logs.csv';
      a.click();
      URL.revokeObjectURL(url);
      toast({ title: 'Exported', description: 'CSV file downloaded.' });
    } catch {
      toast({ title: 'Export failed', description: 'Could not export logs.', variant: 'destructive' });
    }
  };

  const handleFilterChange = (setter: (v: string) => void) => (value: string) => {
    setter(value);
    setPage(1);
  };

  if (isError) {
    return <ErrorState message={error?.message} onRetry={refetch} />;
  }

  return (
    <div>
      <PageHeader title="Activity Logs" subtitle={`${totalEntries} entries`} actions={
        <Button variant="outline" onClick={handleExport}><Download className="h-4 w-4 mr-1" /> Export CSV</Button>
      } />

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search logs..."
            className="pl-9"
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
          />
        </div>
        <Select value={statusFilter} onValueChange={handleFilterChange(setStatusFilter)}>
          <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="success">Success</SelectItem>
            <SelectItem value="failure">Failed</SelectItem>
            <SelectItem value="warning">Warning</SelectItem>
            <SelectItem value="info">Info</SelectItem>
          </SelectContent>
        </Select>
        <Select value={resourceFilter} onValueChange={handleFilterChange(setResourceFilter)}>
          <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Resources</SelectItem>
            {RESOURCES.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {isPending && (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      )}

      {!isPending && logs.length === 0 && (
        <EmptyState icon={ScrollText} title="No logs found" description="Adjust your filters or check back later." />
      )}

      {!isPending && logs.length > 0 && (
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">#</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead className="hidden md:table-cell">Resource</TableHead>
                <TableHead className="hidden lg:table-cell">Details</TableHead>
                <TableHead className="hidden md:table-cell">IP</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log, idx) => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    log{((page - 1) * perPage) + idx + 1}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-7 w-7">
                        <AvatarImage src={log?.user?.profileImage} alt={log?.user?.fullName ?? 'Unknown'} />
                        <AvatarFallback className="text-xs bg-muted">
                          {getInitials(log?.user?.fullName)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{log.user?.fullName ?? 'Unknown'}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{log.action}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span className="text-sm">{log.resource}</span>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="text-sm text-muted-foreground truncate max-w-[200px] block">
                          {log.description ?? '—'}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-sm"><p>{log.description}</p></TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell className="hidden md:table-cell font-mono text-xs">{log.ip ?? '—'}</TableCell>
                  <TableCell><StatusBadge status={log.status === 'failure' ? 'failed' : log.status} /></TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="text-xs text-muted-foreground">{formatRelativeTime(log.createdAt)}</span>
                      </TooltipTrigger>
                      <TooltipContent><p>{formatDateTime(log.createdAt)}</p></TooltipContent>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(p => p - 1)}>
            Previous
          </Button>
          <span className="text-sm py-1 px-2">{page} / {totalPages}</span>
          <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default ActivityLogsPage;

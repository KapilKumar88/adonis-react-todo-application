import React, { useState, useMemo } from 'react';
import { Search, Download, ScrollText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import PageHeader from '@/components/common/PageHeader';
import { StatusBadge } from '@/components/common/StatusBadge';
import EmptyState from '@/components/common/EmptyState';
import { activityLogs } from '@/utils/mockData';
import { formatDateTime, formatRelativeTime, getInitials } from '@/utils/helpers';
import { toast } from '@/hooks/use-toast';

const ActivityLogsPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [resourceFilter, setResourceFilter] = useState('all');
  const [page, setPage] = useState(0);
  const perPage = 15;

  const resources = [...new Set(activityLogs.map(l => l.resource))];

  const filtered = useMemo(() => {
    let result = activityLogs;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(l => l.userName.toLowerCase().includes(q) || l.action.toLowerCase().includes(q) || l.details.toLowerCase().includes(q));
    }
    if (statusFilter !== 'all') result = result.filter(l => l.status === statusFilter);
    if (resourceFilter !== 'all') result = result.filter(l => l.resource === resourceFilter);
    return result;
  }, [search, statusFilter, resourceFilter]);

  const paginated = filtered.slice(page * perPage, (page + 1) * perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

  const handleExport = () => {
    const csv = ['ID,User,Action,Resource,Details,IP,Status,Timestamp', ...filtered.map(l =>
      `${l.id},"${l.userName}","${l.action}","${l.resource}","${l.details}","${l.ipAddress}","${l.status}","${l.timestamp}"`
    )].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'activity-logs.csv'; a.click();
    URL.revokeObjectURL(url);
    toast({ title: 'Exported', description: 'CSV file downloaded.' });
  };

  return (
    <div>
      <PageHeader title="Activity Logs" subtitle={`${filtered.length} entries`} actions={
        <Button variant="outline" onClick={handleExport}><Download className="h-4 w-4 mr-1" /> Export CSV</Button>
      } />

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search logs..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[130px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="success">Success</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
            <SelectItem value="warning">Warning</SelectItem>
          </SelectContent>
        </Select>
        <Select value={resourceFilter} onValueChange={setResourceFilter}>
          <SelectTrigger className="w-[130px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Resources</SelectItem>
            {resources.map(r => <SelectItem key={r} value={r} className="capitalize">{r}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {paginated.length === 0 ? (
        <EmptyState icon={ScrollText} title="No logs found" description="Adjust your filters." />
      ) : (
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
              {paginated.map(log => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono text-xs text-muted-foreground">{log.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-7 w-7"><AvatarFallback className="text-xs bg-muted">{getInitials(log.userName)}</AvatarFallback></Avatar>
                      <span className="text-sm">{log.userName}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{log.action}</TableCell>
                  <TableCell className="hidden md:table-cell"><span className="capitalize text-sm">{log.resource}</span></TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="text-sm text-muted-foreground truncate max-w-[200px] block">{log.details}</span>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-sm"><p>{log.details}</p></TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell className="hidden md:table-cell font-mono text-xs">{log.ipAddress}</TableCell>
                  <TableCell><StatusBadge status={log.status} /></TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Tooltip>
                      <TooltipTrigger asChild><span className="text-xs text-muted-foreground">{formatRelativeTime(log.timestamp)}</span></TooltipTrigger>
                      <TooltipContent><p>{formatDateTime(log.timestamp)}</p></TooltipContent>
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
          <Button variant="outline" size="sm" disabled={page === 0} onClick={() => setPage(p => p - 1)}>Previous</Button>
          <span className="text-sm py-1 px-2">{page + 1} / {totalPages}</span>
          <Button variant="outline" size="sm" disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)}>Next</Button>
        </div>
      )}
    </div>
  );
};

export default ActivityLogsPage;

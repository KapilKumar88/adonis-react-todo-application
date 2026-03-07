import React, { useState, useMemo, useCallback } from 'react';
import { ColumnDef, CellContext } from '@tanstack/react-table';
import { Plus, Trash2, Pencil } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import PageHeader from '@/components/common/PageHeader';
import { RoleBadge } from '@/components/common/StatusBadge';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import { DataTable, SortableHeader } from '@/components/common/DataTable';
import { adminUserService } from '@/services/admin/user.service';
import type { AdminUser } from '@/types/user.types';
import { getInitials, formatDate } from '@/utils/helpers';
import { toast } from '@/hooks/use-toast';
import type { PAGINATION_META_DATA } from '@/types';
import UpsertUserModal from '@/components/admin/user/UpsertUserModal';

// ─── Query key factories ──────────────────────────────────────────────────────
export const userKeys = {
  all: ['admin', 'users'] as const,
  list: (params: object) => ['admin', 'users', params] as const,
};
export const roleKeys = {
  all: ['admin', 'roles'] as const,
};

// ─── Standalone cell renderers ────────────────────────────────────────────────

function UserCell({ row }: Readonly<CellContext<AdminUser, unknown>>) {
  const user = row.original;
  return (
    <div className="flex items-center gap-3">
      <Avatar className="h-8 w-8">
        <AvatarFallback className="text-xs bg-muted">
          {getInitials(user.fullName ?? user.email)}
        </AvatarFallback>
      </Avatar>
      <div>
        <p className="text-sm font-medium">{user.fullName ?? '—'}</p>
        <p className="text-xs text-muted-foreground">{user.email}</p>
      </div>
    </div>
  );
}

function RoleCell({ row }: Readonly<CellContext<AdminUser, unknown>>) {
  const role = row.original.role;
  return role ? (
    <RoleBadge role={role.name as 'admin' | 'moderator' | 'user'} />
  ) : (
    <span className="text-xs text-muted-foreground">No Role</span>
  );
}

function CreatedAtCell({ row }: Readonly<CellContext<AdminUser, unknown>>) {
  return (
    <span className="text-sm text-muted-foreground">
      {formatDate(row.original.createdAt)}
    </span>
  );
}

function UpdatedAtCell({ row }: Readonly<CellContext<AdminUser, unknown>>) {
  return (
    <span className="text-sm text-muted-foreground">
      {row.original.updatedAt ? formatDate(row.original.updatedAt) : '—'}
    </span>
  );
}

type ActionsCellProps = Readonly<CellContext<AdminUser, unknown>> & {
  onEdit: (user: AdminUser) => void;
  onDelete: (id: string) => void;
};

function ActionsCell({ row, onEdit, onDelete }: ActionsCellProps) {
  const user = row.original;
  return (
    <div className="flex items-center gap-1">
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onEdit(user)}>
        <Pencil className="h-3.5 w-3.5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-destructive"
        onClick={() => onDelete(user.id)}
      >
        <Trash2 className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}

// ─── Column factory (module-level to avoid deep nesting) ────────────────────

function buildColumns(
  onEdit: (user: AdminUser) => void,
  onDelete: (id: string) => void,
): ColumnDef<AdminUser>[] {
  return [
    { id: 'user', header: 'User', cell: UserCell },
    { id: 'role', header: 'Role', cell: RoleCell },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => <SortableHeader column={column} title="Joined" />,
      cell: CreatedAtCell,
    },
    { accessorKey: 'updatedAt', header: 'Updated', cell: UpdatedAtCell },
    {
      id: 'actions',
      header: 'Actions',
      enableHiding: false,
      cell: (ctx) => <ActionsCell {...ctx} onEdit={onEdit} onDelete={onDelete} />,
    },
  ];
}

// ─── Component ────────────────────────────────────────────────────────────────
const UsersPage: React.FC = () => {
  const queryClient = useQueryClient();

  // ── Filters / pagination / sorting ───────────────────────────────────────
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // ── Modal state ──────────────────────────────────────────────────────────
  const [modalOpen, setModalOpen] = useState(false);
  const [editUser, setEditUser] = useState<AdminUser | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // ── Data queries ─────────────────────────────────────────────────────────
  const queryParams = useMemo(
    () => ({ page, limit: pageSize, ...(sortBy && { sortBy, sortOrder }) }),
    [page, pageSize, sortBy, sortOrder],
  );

  const { data: usersData, isLoading: usersLoading } = useQuery({
    queryKey: userKeys.list(queryParams),
    queryFn: () => adminUserService.list(queryParams),
    staleTime: 30_000,
  });



  // ── Mutations ────────────────────────────────────────────────────────────
  const invalidateUsers = () =>
    queryClient.invalidateQueries({ queryKey: userKeys.all });


  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminUserService.remove(id),
    onSuccess: () => {
      invalidateUsers();
      toast({ title: 'User Deleted' });
      setDeleteConfirm(null);
    },
    onError: (err: Error) =>
      toast({ title: 'Error', description: err.message, variant: 'destructive' }),
  });

  // ── Helpers ──────────────────────────────────────────────────────────────
  const openModal = (user?: AdminUser) => {
    if (user) {
      setEditUser(user);
    } else {
      setEditUser(null);
    }
    setModalOpen(true);
  };



  const handlePaginationChange = (newPage: number, newPageSize: number) => {
    setPage(newPage);
    setPageSize(newPageSize);
  };

  const handleSortingChange = (col: string, order: 'asc' | 'desc') => {
    setSortBy(col);
    setSortOrder(order);
    setPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const stableOpenModal = useCallback(openModal, []);
  const columns = useMemo(
    () => buildColumns(stableOpenModal, setDeleteConfirm),
    [stableOpenModal],
  );

  const meta = usersData?.meta as PAGINATION_META_DATA | undefined;
  const users = usersData?.data ?? [];

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div>
      <PageHeader
        title="User Management"
        subtitle={`${meta?.total ?? 0} users`}
        actions={
          <Button onClick={() => openModal()}>
            <Plus className="h-4 w-4 mr-1" /> Add User
          </Button>
        }
      />

      <DataTable
        columns={columns}
        data={users}
        meta={meta}
        isLoading={usersLoading}
        page={page}
        pageSize={pageSize}
        onPaginationChange={handlePaginationChange}
        onSortingChange={handleSortingChange}
        searchPlaceholder="Search users..."
        searchValue={search}
        onSearchChange={handleSearchChange}
      />

      {/* Create / Edit dialog */}
      <UpsertUserModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        editUser={editUser}
        onSuccess={() => invalidateUsers()}
      />


      {/* Delete confirmation */}
      <ConfirmDialog
        open={!!deleteConfirm}
        onOpenChange={() => setDeleteConfirm(null)}
        title="Delete User"
        description="This action cannot be undone."
        onConfirm={() => deleteConfirm && deleteMutation.mutate(deleteConfirm)}
      />
    </div>
  );
};

export default UsersPage;

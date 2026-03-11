import React, { useState, useCallback } from 'react';
import { Plus, Trash2, Pencil, ListTodo } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import PageHeader from '@/components/common/PageHeader';
import { StatusBadge, PriorityBadge } from '@/components/common/StatusBadge';
import EmptyState from '@/components/common/EmptyState';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import TodoModal from '@/components/user/todo/UpsertTodoModal';
import { DataTable, SortableHeader } from '@/components/common/DataTable';
import { useTodosQuery, useDeleteTodo, useUpdateTodo } from '@/hooks/useTodos';
import type { Todo } from '@/types';
import { formatDate } from '@/utils/helpers';
import { toast } from '@/hooks/use-toast';
import { useDebounce } from '@/hooks/useDebounce';
import UpsertTodoModal from '@/components/user/todo/UpsertTodoModal';

const columns: ColumnDef<Todo>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'title',
    header: ({ column }) => <SortableHeader column={column} title="Title" />,
    cell: ({ row }) => {
      const todo = row.original;
      return (
        <div className="text-left">
          <p className={`text-sm font-medium ${todo.status === 'completed' ? 'line-through text-muted-foreground' : ''}`}>{todo.title}</p>
          {todo.description && <p className="text-xs text-muted-foreground truncate max-w-[300px]">{todo.description}</p>}
        </div>
      );
    },
  },
  {
    accessorKey: 'priority',
    header: ({ column }) => <SortableHeader column={column} title="Priority" />,
    cell: ({ row }) => <PriorityBadge priority={row.getValue('priority')} />,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <SortableHeader column={column} title="Status" />,
    cell: ({ row }) => <StatusBadge status={row.getValue('status')} />,
  },
  {
    accessorKey: 'dueDate',
    header: ({ column }) => <SortableHeader column={column} title="Due Date" />,
    cell: ({ row }) => {
      const dueDate = row.getValue<string | null>('dueDate');
      return <span className="text-sm text-muted-foreground">{dueDate ? formatDate(dueDate) : '—'}</span>;
    },
  },
];

const TodosPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTodo, setEditTodo] = useState<Todo | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [bulkDeleteConfirm, setBulkDeleteConfirm] = useState(false);
  const [selectedRows, setSelectedRows] = useState<Todo[]>([]);

  const debouncedSearch = useDebounce(search, 300);

  const { data, isLoading } = useTodosQuery({
    page,
    limit: pageSize,
    status: statusFilter !== 'all' ? statusFilter : undefined,
    priority: priorityFilter !== 'all' ? priorityFilter : undefined,
    search: debouncedSearch || undefined,
  });

  const deleteTodoMutation = useDeleteTodo();
  const updateTodoMutation = useUpdateTodo();

  const todos = data?.data ?? [];
  const meta = data?.meta;

  const handleDelete = (id: string) => {
    deleteTodoMutation.mutate(id, {
      onSuccess: () => {
        setDeleteConfirm(null);
        toast({ title: 'Todo Deleted' });
      },
      onError: (error) => {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
      },
    });
  };

  const handleBulkDelete = async () => {
    try {
      await Promise.all(selectedRows.map(row => deleteTodoMutation.mutateAsync(row.id)));
      toast({ title: `${selectedRows.length} todos deleted` });
      setSelectedRows([]);
      setBulkDeleteConfirm(false);
    } catch {
      toast({ title: 'Error deleting todos', variant: 'destructive' });
    }
  };

  const toggleComplete = (todo: Todo) => {
    const newStatus = todo.status === 'completed' ? 'pending' : 'completed';
    updateTodoMutation.mutate(
      { id: todo.id, payload: { status: newStatus } },
      {
        onError: (error) => {
          toast({ title: 'Error', description: error.message, variant: 'destructive' });
        },
      },
    );
  };

  const handlePaginationChange = useCallback((newPage: number, newPageSize: number) => {
    setPage(newPage);
    setPageSize(newPageSize);
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, []);

  // Actions column needs closures, so define it here
  const allColumns: ColumnDef<Todo>[] = [
    ...columns,
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const todo = row.original;
        return (
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toggleComplete(todo)} title="Toggle complete">
              <Checkbox checked={todo.status === 'completed'} className="pointer-events-none" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setEditTodo(todo); setModalOpen(true); }}>
              <Pencil className="h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => setDeleteConfirm(todo.id)}>
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
  ];

  const filterToolbar = (
    <div className="flex items-center gap-2">
      <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setPage(1); }}>
        <SelectTrigger className="w-[140px] h-8"><SelectValue placeholder="Status" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="in_progress">In Progress</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
        </SelectContent>
      </Select>
      <Select value={priorityFilter} onValueChange={(v) => { setPriorityFilter(v); setPage(1); }}>
        <SelectTrigger className="w-[140px] h-8"><SelectValue placeholder="Priority" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Priority</SelectItem>
          <SelectItem value="low">Low</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="high">High</SelectItem>
        </SelectContent>
      </Select>
      {selectedRows.length > 0 && (
        <Button variant="destructive" size="sm" onClick={() => setBulkDeleteConfirm(true)}>
          <Trash2 className="h-3 w-3 mr-1" /> Delete {selectedRows.length}
        </Button>
      )}
      <Button size="sm" onClick={() => { setEditTodo(null); setModalOpen(true); }}>
        <Plus className="h-4 w-4 mr-1" /> Add Todo
      </Button>
    </div>
  );

  if (!isLoading && todos.length === 0 && !debouncedSearch && statusFilter === 'all' && priorityFilter === 'all') {
    return (
      <div>
        <PageHeader title="My Todos" subtitle="Manage your tasks" />
        <EmptyState icon={ListTodo} title="No todos found" description="Create your first todo to get started." actionLabel="Add Todo" onAction={() => { setEditTodo(null); setModalOpen(true); }} />
        <TodoModal open={modalOpen} onOpenChange={setModalOpen} todo={editTodo} />
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="My Todos" subtitle="Manage your tasks" />

      <DataTable
        columns={allColumns}
        data={todos}
        meta={meta}
        isLoading={isLoading}
        page={page}
        pageSize={pageSize}
        onPaginationChange={handlePaginationChange}
        searchPlaceholder="Search todos..."
        searchValue={search}
        onSearchChange={handleSearchChange}
        toolbar={filterToolbar}
      />

      <UpsertTodoModal open={modalOpen} onOpenChange={setModalOpen} todo={editTodo} />
      <ConfirmDialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)} title="Delete Todo" description="Are you sure? This cannot be undone." onConfirm={() => deleteConfirm && handleDelete(deleteConfirm)} loading={deleteTodoMutation.isPending} />
      <ConfirmDialog open={bulkDeleteConfirm} onOpenChange={setBulkDeleteConfirm} title="Delete Selected" description={`Delete ${selectedRows.length} selected todos?`} onConfirm={handleBulkDelete} loading={deleteTodoMutation.isPending} />
    </div>
  );
};

export default TodosPage;

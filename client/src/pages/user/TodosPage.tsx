import React, { useState, useCallback, Dispatch, SetStateAction } from 'react';
import { Plus, Trash2, Pencil, ListTodo } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import PageHeader from '@/components/common/PageHeader';
import { StatusBadge, PriorityBadge } from '@/components/common/StatusBadge';
import EmptyState from '@/components/common/EmptyState';
import { DataTable, SortableHeader } from '@/components/common/DataTable';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useTodosQuery, useDeleteTodo, useUpdateTodo } from '@/hooks/useTodos';
import { formatDate } from '@/utils/helpers';
import { toast } from '@/hooks/use-toast';
import { useDebounce } from '@/hooks/useDebounce';
import UpsertTodoModal from '@/components/user/todo/UpsertTodoModal';
import { Todo, TodoPriority, TodoStatus } from '@/types/todo.types';
import TodoFilters from '@/components/user/todo/TodoFilters';
import ConfirmDialog from '@/components/common/ConfirmDialog';

const columnsDefination = ({
  toggleComplete,
  setEditTodo,
  setModalOpen,
  setDeleteConfirm,
  setSelectedRows,
}: Readonly<{
  toggleComplete: (todo: Todo) => void;
  setEditTodo: (todo: Todo | null) => void;
  setModalOpen: (open: boolean) => void;
  setDeleteConfirm: (id: string | null) => void;
  setSelectedRows: Dispatch<SetStateAction<Todo[]>>
}>): ColumnDef<Todo>[] => {
  return [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={Boolean(table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate'))}
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value);
            setSelectedRows(value ? table.getCoreRowModel().rows.map((r) => r.original) : []);
          }}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            console.log(value, !!value)
            row.toggleSelected(!!value);
            setSelectedRows((previousState) => {
              if (value) {
                return [
                  ...previousState,
                  row.original
                ]
              } else {
                return previousState.filter((r) => r.id !== row.original.id);
              }
            });
          }}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'title',
      cell: ({ row }) => {
        const todo = row.original;
        return (
          <div className="text-left">
            <p className={`text-sm font-medium ${todo.status === 'completed' ? 'line-through text-muted-foreground' : ''}`}>{todo.title}</p>
            {todo.description && <p className="text-xs text-muted-foreground truncate max-w-[300px]">{todo.description}</p>}
          </div>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: 'description',
      header: 'Description',
      cell: ({ row }) => {
        const description = row.original.description;
        if (!description) return <span className="text-muted-foreground text-sm">—</span>;
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <p className="text-sm text-muted-foreground truncate max-w-[200px] cursor-default">
                  {description}
                </p>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs whitespace-pre-wrap break-words">
                {description}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: 'tags',
      header: 'Tags',
      cell: ({ row }) => {
        const tags = row.original.tags;
        if (!tags?.length) return <span className="text-muted-foreground text-sm">—</span>;
        return (
          <div className="flex flex-wrap gap-1 max-w-[200px]">
            {tags.map((tag) => (
              <span
                key={tag.id}
                className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset"
                style={
                  tag.color
                    ? { backgroundColor: `${tag.color}22`, color: tag.color }
                    : undefined
                }
              >
                {tag.name}
              </span>
            ))}
          </div>
        );
      },
      enableSorting: false,
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
      accessorKey: 'createdAt',
      header: ({ column }) => <SortableHeader column={column} title="Created At" />,
      cell: ({ row }) => {
        const createdAt = row.getValue<string | null>('createdAt');
        return <span className="text-sm text-muted-foreground">{createdAt ? formatDate(createdAt) : '—'}</span>;
      },
    },
    {
      accessorKey: 'dueDate',
      header: ({ column }) => <SortableHeader column={column} title="Due Date" />,
      cell: ({ row }) => {
        const dueDate = row.getValue<string | null>('dueDate');
        return <span className="text-sm text-muted-foreground">{dueDate ? formatDate(dueDate) : '—'}</span>;
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const todo = row.original;
        return (
          <div className="flex items-center gap-1">
            <Button
              type="button"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground"
              onClick={() => toggleComplete(todo)}
              title="Toggle complete"
            >
              <Checkbox checked={todo.status === TodoStatus.Completed} className="pointer-events-none" />
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
}

const TodosPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<TodoStatus | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<TodoPriority | 'all'>('all');
  const [sortBy, setSortBy] = useState<keyof Todo | null>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>('desc');
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
    status: statusFilter === 'all' ? undefined : statusFilter,
    priority: priorityFilter === 'all' ? undefined : priorityFilter,
    search: debouncedSearch || undefined,
    sortBy: sortBy || undefined,
    sortDirection: sortDirection || undefined,
  });

  const deleteTodoMutation = useDeleteTodo();
  const updateTodoMutation = useUpdateTodo();

  const todos = data?.data ?? [];
  const meta = data?.meta;

  const handleDelete = (ids: string | string[]) => {
    deleteTodoMutation.mutate(ids, {
      onSuccess: () => {
        setDeleteConfirm(null);
        setBulkDeleteConfirm(false);
        setSelectedRows([]);
        toast({ title: 'Todo Deleted' });
      },
      onError: (error) => {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
      },
    });
  };

  const toggleComplete = (todo: Todo) => {
    const newStatus = todo.status === TodoStatus.Completed ? TodoStatus.Pending : TodoStatus.Completed;
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


  if (!isLoading && todos.length === 0 && !debouncedSearch && statusFilter === 'all' && priorityFilter === 'all') {
    return (
      <div>
        <PageHeader title="My Todos" subtitle="Manage your tasks" />
        <EmptyState icon={ListTodo} title="No todos found" description="Create your first todo to get started." actionLabel="Add Todo" onAction={() => { setEditTodo(null); setModalOpen(true); }} />
        <UpsertTodoModal open={modalOpen} onOpenChange={setModalOpen} />
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="My Todos" subtitle="Manage your tasks" actions={
        <Button size="sm" onClick={() => { setEditTodo(null); setModalOpen(true); }}>
          <Plus className="h-4 w-4 mr-1" /> Add Todo
        </Button>
      } />

      <DataTable
        columns={columnsDefination({ toggleComplete, setEditTodo, setModalOpen, setDeleteConfirm, setSelectedRows })}
        data={todos}
        meta={meta}
        isLoading={isLoading}
        page={page}
        pageSize={pageSize}
        onPaginationChange={handlePaginationChange}
        defaultSortBy={sortBy || undefined}
        defaultSortDirection={sortDirection || 'desc'}
        searchPlaceholder="Search todos..."
        searchValue={search}
        onSearchChange={handleSearchChange}
        onSortingChange={(payload, direction) => {
          setSortBy(payload as keyof Todo);
          setSortDirection(direction);
        }}
        toolbar={<TodoFilters
          statusFilter={statusFilter}
          priorityFilter={priorityFilter}
          selectedRowCount={selectedRows?.length}
          onStatusChange={(v) => { setStatusFilter(v as TodoStatus | 'all'); setPage(1); }}
          onPriorityChange={(v) => { setPriorityFilter(v as TodoPriority | 'all'); setPage(1); }}
          onBulkDelete={() => setBulkDeleteConfirm(true)}
        />}
      />

      <UpsertTodoModal open={modalOpen} onOpenChange={setModalOpen} todo={editTodo} />
      <ConfirmDialog
        open={!!deleteConfirm}
        onOpenChange={() => setDeleteConfirm(null)}
        title="Delete Todo"
        description="Are you sure? This cannot be undone."
        onConfirm={() => deleteConfirm && handleDelete(deleteConfirm)}
        loading={deleteTodoMutation.isPending}
      />
      <ConfirmDialog
        open={bulkDeleteConfirm}
        onOpenChange={setBulkDeleteConfirm}
        title="Delete Selected"
        description={`Delete ${selectedRows.length} selected todos?`}
        onConfirm={() => bulkDeleteConfirm && handleDelete(selectedRows?.map((r) => r.id) ?? [])}
        loading={deleteTodoMutation.isPending}
      />
    </div>
  );
};

export default TodosPage;

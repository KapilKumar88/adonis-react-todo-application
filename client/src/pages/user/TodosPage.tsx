import React, { useState, useMemo } from 'react';
import { Plus, Search, Trash2, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import PageHeader from '@/components/common/PageHeader';
import { StatusBadge, PriorityBadge } from '@/components/common/StatusBadge';
import EmptyState from '@/components/common/EmptyState';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import TodoModal from '@/components/user/TodoModal';
import { useTodos } from '@/context/TodoContext';
import { Todo, TodoStatus, TodoPriority } from '@/types';
import { formatDate } from '@/utils/helpers';
import { toast } from '@/hooks/use-toast';
import { ListTodo } from 'lucide-react';

const TodosPage: React.FC = () => {
  const { userTodos, filterTodos, deleteTodo, deleteTodos, toggleComplete } = useTodos();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('date');
  const [selected, setSelected] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTodo, setEditTodo] = useState<Todo | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [bulkDeleteConfirm, setBulkDeleteConfirm] = useState(false);

  const filtered = useMemo(() => {
    let result = filterTodos(
      userTodos,
      statusFilter !== 'all' ? statusFilter as TodoStatus : undefined,
      priorityFilter !== 'all' ? priorityFilter as TodoPriority : undefined,
      search || undefined,
    );
    result.sort((a, b) => {
      if (sortBy === 'priority') {
        const order = { high: 0, medium: 1, low: 2 };
        return order[a.priority] - order[b.priority];
      }
      if (sortBy === 'status') return a.status.localeCompare(b.status);
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
    return result;
  }, [userTodos, search, statusFilter, priorityFilter, sortBy, filterTodos]);

  const toggleSelect = (id: string) => setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const selectAll = () => setSelected(selected.length === filtered.length ? [] : filtered.map(t => t.id));

  const handleDelete = (id: string) => {
    deleteTodo(id);
    setDeleteConfirm(null);
    toast({ title: 'Todo Deleted' });
  };

  const handleBulkDelete = () => {
    deleteTodos(selected);
    setSelected([]);
    setBulkDeleteConfirm(false);
    toast({ title: `${selected.length} todos deleted` });
  };

  return (
    <div>
      <PageHeader title="My Todos" subtitle="Manage your tasks" actions={
        <Button onClick={() => { setEditTodo(null); setModalOpen(true); }}><Plus className="h-4 w-4 mr-1" /> Add Todo</Button>
      } />

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search todos..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[140px]"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger className="w-[140px]"><SelectValue placeholder="Priority" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priority</SelectItem>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[140px]"><SelectValue placeholder="Sort" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Date</SelectItem>
            <SelectItem value="priority">Priority</SelectItem>
            <SelectItem value="status">Status</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {selected.length > 0 && (
        <div className="flex items-center gap-2 mb-3 p-2 bg-muted rounded-md">
          <span className="text-sm">{selected.length} selected</span>
          <Button variant="destructive" size="sm" onClick={() => setBulkDeleteConfirm(true)}>
            <Trash2 className="h-3 w-3 mr-1" /> Delete
          </Button>
        </div>
      )}

      {filtered.length === 0 ? (
        <EmptyState icon={ListTodo} title="No todos found" description="Create your first todo or adjust your filters." actionLabel="Add Todo" onAction={() => { setEditTodo(null); setModalOpen(true); }} />
      ) : (
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10"><Checkbox checked={selected.length === filtered.length && filtered.length > 0} onCheckedChange={selectAll} /></TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="hidden md:table-cell">Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Due Date</TableHead>
                <TableHead className="w-20">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(todo => (
                <TableRow key={todo.id} className="group">
                  <TableCell><Checkbox checked={selected.includes(todo.id)} onCheckedChange={() => toggleSelect(todo.id)} /></TableCell>
                  <TableCell>
                    <button onClick={() => toggleComplete(todo.id)} className="text-left">
                      <p className={`text-sm font-medium ${todo.status === 'completed' ? 'line-through text-muted-foreground' : ''}`}>{todo.title}</p>
                      {todo.description && <p className="text-xs text-muted-foreground truncate max-w-[300px]">{todo.description}</p>}
                    </button>
                  </TableCell>
                  <TableCell className="hidden md:table-cell"><PriorityBadge priority={todo.priority} /></TableCell>
                  <TableCell><StatusBadge status={todo.status} /></TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{todo.dueDate ? formatDate(todo.dueDate) : '—'}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setEditTodo(todo); setModalOpen(true); }}>
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => setDeleteConfirm(todo.id)}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <TodoModal open={modalOpen} onOpenChange={setModalOpen} todo={editTodo} />
      <ConfirmDialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)} title="Delete Todo" description="Are you sure? This cannot be undone." onConfirm={() => deleteConfirm && handleDelete(deleteConfirm)} />
      <ConfirmDialog open={bulkDeleteConfirm} onOpenChange={setBulkDeleteConfirm} title="Delete Selected" description={`Delete ${selected.length} selected todos?`} onConfirm={handleBulkDelete} />
    </div>
  );
};

export default TodosPage;

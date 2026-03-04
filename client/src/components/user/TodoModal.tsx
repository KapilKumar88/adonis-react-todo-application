import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTodos } from '@/context/TodoContext';
import { Todo } from '@/types';
import { toast } from '@/hooks/use-toast';

interface TodoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  todo?: Todo | null;
}

const TodoModal: React.FC<TodoModalProps> = ({ open, onOpenChange, todo }) => {
  const { addTodo, updateTodo } = useTodos();
  const [title, setTitle] = useState(todo?.title || '');
  const [description, setDescription] = useState(todo?.description || '');
  const [priority, setPriority] = useState<Todo['priority']>(todo?.priority || 'medium');
  const [status, setStatus] = useState<Todo['status']>(todo?.status || 'pending');
  const [dueDate, setDueDate] = useState(todo?.dueDate?.slice(0, 10) || '');
  const [tags, setTags] = useState(todo?.tags?.join(', ') || '');

  React.useEffect(() => {
    if (open) {
      setTitle(todo?.title || '');
      setDescription(todo?.description || '');
      setPriority(todo?.priority || 'medium');
      setStatus(todo?.status || 'pending');
      setDueDate(todo?.dueDate?.slice(0, 10) || '');
      setTags(todo?.tags?.join(', ') || '');
    }
  }, [open, todo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    const tagList = tags.split(',').map(t => t.trim()).filter(Boolean);
    if (todo) {
      updateTodo(todo.id, { title, description, priority, status, dueDate: dueDate ? new Date(dueDate).toISOString() : undefined, tags: tagList });
      toast({ title: 'Todo Updated' });
    } else {
      addTodo({ title, description, priority, status, dueDate: dueDate ? new Date(dueDate).toISOString() : undefined, tags: tagList });
      toast({ title: 'Todo Created' });
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{todo ? 'Edit Todo' : 'Add Todo'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input id="title" value={title} onChange={e => setTitle(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="desc">Description</Label>
            <Textarea id="desc" value={description} onChange={e => setDescription(e.target.value)} rows={3} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Priority</Label>
              <Select value={priority} onValueChange={v => setPriority(v as Todo['priority'])}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={status} onValueChange={v => setStatus(v as Todo['status'])}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="due">Due Date</Label>
              <Input id="due" type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <Input id="tags" placeholder="tag1, tag2" value={tags} onChange={e => setTags(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit">{todo ? 'Save Changes' : 'Add Todo'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TodoModal;

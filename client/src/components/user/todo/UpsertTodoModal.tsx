import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X, Loader2 } from 'lucide-react';
import { useCreateTodo, useUpdateTodo } from '@/hooks/useTodos';
import { useTagsQuery } from '@/hooks/useTags';
import { Todo } from '@/types';
import { toast } from '@/hooks/use-toast';

interface TodoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  todo?: Todo | null;
}

const UpsertTodoModal: React.FC<TodoModalProps> = ({ open, onOpenChange, todo }) => {
  const createTodo = useCreateTodo();
  const updateTodo = useUpdateTodo();
  const { data: tags = [] } = useTagsQuery();

  const [title, setTitle] = useState(todo?.title || '');
  const [description, setDescription] = useState(todo?.description || '');
  const [priority, setPriority] = useState<string>(todo?.priority || 'medium');
  const [status, setStatus] = useState<string>(todo?.status || 'pending');
  const [dueDate, setDueDate] = useState(todo?.dueDate?.slice(0, 10) || '');
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>(
    todo?.tags?.map(t => t.id) || []
  );

  React.useEffect(() => {
    if (open) {
      setTitle(todo?.title || '');
      setDescription(todo?.description || '');
      setPriority(todo?.priority || 'medium');
      setStatus(todo?.status || 'pending');
      setDueDate(todo?.dueDate?.slice(0, 10) || '');
      setSelectedTagIds(todo?.tags?.map(t => t.id) || []);
    }
  }, [open, todo]);

  const isPending = createTodo.isPending || updateTodo.isPending;

  const toggleTag = (tagId: string) => {
    setSelectedTagIds(prev =>
      prev.includes(tagId) ? prev.filter(id => id !== tagId) : [...prev, tagId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const payload = {
      title,
      description: description || null,
      priority: priority as 'low' | 'medium' | 'high',
      status: status as 'pending' | 'in_progress' | 'completed',
      dueDate: dueDate || null,
      tagIds: selectedTagIds,
    };

    if (todo) {
      updateTodo.mutate({ id: todo.id, payload }, {
        onSuccess: () => {
          toast({ title: 'Todo Updated' });
          onOpenChange(false);
        },
        onError: (error) => {
          toast({ title: 'Error', description: error.message, variant: 'destructive' });
        },
      });
    } else {
      createTodo.mutate(payload, {
        onSuccess: () => {
          toast({ title: 'Todo Created' });
          onOpenChange(false);
        },
        onError: (error) => {
          toast({ title: 'Error', description: error.message, variant: 'destructive' });
        },
      });
    }
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
              <Select value={priority} onValueChange={setPriority}>
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
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="due">Due Date</Label>
            <Input id="due" type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
          </div>

          {/* Tag selection */}
          {tags.length > 0 && (
            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => {
                  const isSelected = selectedTagIds.includes(tag.id);
                  return (
                    <Badge
                      key={tag.id}
                      variant={isSelected ? 'default' : 'outline'}
                      className="cursor-pointer select-none"
                      style={isSelected && tag.color ? { backgroundColor: tag.color } : undefined}
                      onClick={() => toggleTag(tag.id)}
                    >
                      {tag.name}
                      {isSelected && <X className="h-3 w-3 ml-1" />}
                    </Badge>
                  );
                })}
              </div>
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="h-4 w-4 mr-1 animate-spin" />}
              {todo ? 'Save Changes' : 'Add Todo'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpsertTodoModal;

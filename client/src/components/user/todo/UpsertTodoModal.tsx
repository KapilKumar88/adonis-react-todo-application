import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCreateTodo, useUpdateTodo } from '@/hooks/useTodos';
import { toast } from '@/hooks/use-toast';
import { Todo, TodoPriority, TodoStatus } from '@/types/todo.types';
import { upsertTodoSchema, type UpsertTodoFormValues } from '@/validations/user/todo.validation';
import TagMultiSelect from '@/components/common/TagMultiSelect';
import DatePicker from '@/components/common/DatePicker';
import LoadingButton from '@/components/common/LoadingButton';
import { usePermission } from '@/hooks/usePermission';
import { PERMISSIONS } from '@/constants/permission.constant';

const statusOptions = [
  { value: TodoStatus.Pending, label: 'Pending' },
  { value: TodoStatus.InProgress, label: 'In Progress' },
  { value: TodoStatus.Completed, label: 'Completed' },
  { value: TodoStatus.Backlog, label: 'Backlog' },
  { value: TodoStatus.Icebox, label: 'Icebox' },
];

const priorityOptions = [
  { value: TodoPriority.Low, label: 'Low' },
  { value: TodoPriority.Medium, label: 'Medium' },
  { value: TodoPriority.High, label: 'High' },
];

interface TodoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  todo?: Todo | null;
}

const UpsertTodoModal: React.FC<TodoModalProps> = ({ open, onOpenChange, todo }) => {
  const createTodo = useCreateTodo();
  const updateTodo = useUpdateTodo();
  const can = usePermission();


  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<UpsertTodoFormValues>({
    resolver: yupResolver(upsertTodoSchema),
    defaultValues: {
      title: '',
      description: null,
      priority: TodoPriority.Medium,
      status: TodoStatus.Pending,
      dueDate: null,
      tagIds: [],
    },
  });

  React.useEffect(() => {
    if (open) {
      reset({
        title: todo?.title || '',
        description: todo?.description || null,
        priority: todo?.priority || TodoPriority.Medium,
        status: todo?.status || TodoStatus.Pending,
        dueDate: todo?.dueDate?.slice(0, 10) || null,
        tagIds: todo?.tags?.map(t => t.id) || [],
      });
    }
  }, [open, todo, reset]);

  const canUpsert = can(PERMISSIONS.TODO_MANAGEMENT.CREATE) || can(PERMISSIONS.TODO_MANAGEMENT.UPDATE);

  if (!canUpsert) {
    return null; // Don't render the modal if user doesn't have permission
  }

  const isPending = createTodo.isPending || updateTodo.isPending;

  const onSubmit = (values: UpsertTodoFormValues) => {
    const payload = {
      title: values.title,
      description: values.description || null,
      priority: values.priority,
      status: values.status,
      dueDate: values.dueDate || null,
      tagIds: values.tagIds,
    };

    const mutationOptions = {
      onSuccess: () => {
        toast({ title: todo ? 'Todo Updated' : 'Todo Created' });
        onOpenChange(false);
      },
      onError: (error: Error) => {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
      },
    };

    if (todo) {
      updateTodo.mutate({ id: todo.id, payload }, mutationOptions);
    } else {
      createTodo.mutate(payload, mutationOptions);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{todo ? 'Edit Todo' : 'Add Todo'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input id="title" {...register('title')} />
            {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" {...register('description')} rows={3} />
            {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Priority</Label>
              <Controller
                control={control}
                name="priority"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {priorityOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.priority && <p className="text-sm text-destructive">{errors.priority.message}</p>}
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.status && <p className="text-sm text-destructive">{errors.status.message}</p>}
            </div>
          </div>
          <div className="space-y-2">
            <Label>Due Date</Label>
            <Controller
              control={control}
              name="dueDate"
              render={({ field }) => (
                <DatePicker
                  value={field.value ?? null}
                  onChange={field.onChange}
                />
              )}
            />
          </div>

          {/* Tags section */}
          <div className="space-y-2">
            <Label>Tags</Label>
            <Controller
              control={control}
              name="tagIds"
              render={({ field }) => (
                <TagMultiSelect
                  value={field.value ?? []}
                  onChange={field.onChange}
                />
              )}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            {canUpsert && (
              <LoadingButton type="submit" disabled={isPending} isLoading={isPending} label={todo ? 'Save Changes' : 'Add Todo'} />
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpsertTodoModal;

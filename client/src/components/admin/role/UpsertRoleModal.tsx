import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { AdminRole } from '@/types/role.types';
import { adminRoleService } from '@/services/admin/role.service';
import { upsertRoleSchema, UpsertRoleFormValues } from '@/validations/admin/role.validation';
import { toast } from '@/hooks/use-toast';
import LoadingButton from '@/components/common/LoadingButton';
import { SaveIcon } from 'lucide-react';

export default function UpsertRoleModal({
  modalOpen,
  setModalOpen,
  editRole,
  isEdit = false,
}: Readonly<{
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  editRole?: AdminRole | null;
  isEdit?: boolean;
}>) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpsertRoleFormValues>({
    resolver: zodResolver(upsertRoleSchema),
    defaultValues: {
      name: '',
      displayName: '',
      description: '',
    },
  });

  // Populate form when editing an existing role
  useEffect(() => {
    if (isEdit && editRole) {
      reset({
        name: editRole.name,
        displayName: editRole.displayName,
        description: editRole.description ?? '',
      });
    } else {
      reset({ name: '', displayName: '', description: '' });
    }
  }, [editRole, isEdit, modalOpen, reset]);

  const createMutation = useMutation({
    mutationFn: (values: UpsertRoleFormValues) =>
      adminRoleService.create({
        name: values.name,
        displayName: values.displayName,
        description: values.description ?? null,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      toast({ title: 'Role Created', description: 'The new role has been created successfully.' });
      setModalOpen(false);
    },
    onError: (err: Error) => {
      toast({ title: 'Failed to create role', description: err.message, variant: 'destructive' });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (values: UpsertRoleFormValues) =>
      adminRoleService.update(editRole!.id, {
        name: values.name,
        displayName: values.displayName,
        description: values.description ?? null,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      toast({ title: 'Role Updated', description: 'The role has been updated successfully.' });
      setModalOpen(false);
    },
    onError: (err: Error) => {
      toast({ title: 'Failed to update role', description: err.message, variant: 'destructive' });
    },
  });

  const isPending = createMutation.isPending || updateMutation.isPending;

  let submitLabel = 'Create Role';
  if (isPending) submitLabel = 'Saving...';
  else if (isEdit) submitLabel = 'Save Changes';

  const handleFormSubmit = (values: UpsertRoleFormValues) => {
    if (editRole && isEdit) {
      updateMutation.mutate(values);
    } else {
      createMutation.mutate(values);
    }
  };

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit Role' : 'Add Role'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {/* Role Name (slug) */}
          <div className="space-y-2">
            <Label htmlFor="name">Role Name</Label>
            <Input
              id="name"
              placeholder="e.g. content_manager"
              {...register('name')}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* Display Name */}
          <div className="space-y-2">
            <Label htmlFor="displayName">Display Name</Label>
            <Input
              id="displayName"
              placeholder="e.g. Content Manager"
              {...register('displayName')}
            />
            {errors.displayName && (
              <p className="text-sm text-destructive">{errors.displayName.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Briefly describe the role's purpose..."
              rows={3}
              {...register('description')}
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" disabled={isPending} onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <LoadingButton type="submit" isLoading={isPending} disabled={isPending} label={submitLabel} icon={SaveIcon} />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
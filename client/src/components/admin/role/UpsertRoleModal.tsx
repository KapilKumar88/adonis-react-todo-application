import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { adminRoleService } from '@/services/admin/role.service';
import { upsertRoleSchema, UpsertRoleFormValues } from '@/validations/admin/role.validation';
import { toast } from '@/hooks/use-toast';
import LoadingButton from '@/components/common/LoadingButton';
import { SaveIcon } from 'lucide-react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useGetPermissionsList } from '@/hooks/usePermission';
import { AdminSideRoleType } from '@/types/role.types';
import { Checkbox } from '@/components/ui/checkbox';
import { roleKeys } from '@/services/admin/user.service';

export default function UpsertRoleModal({
  modalOpen,
  setModalOpen,
  editRole,
}: Readonly<{
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  editRole?: AdminSideRoleType | null;
}>) {

  const isEdit = editRole !== null && editRole !== undefined;
  const queryClient = useQueryClient();
  const { data: permissionsList } = useGetPermissionsList();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UpsertRoleFormValues>({
    resolver: yupResolver(upsertRoleSchema),
    defaultValues: {
      name: '',
      displayName: '',
      description: '',
      permissions: editRole?.permissions?.map(p => p.id) || [],
    },
  });

  // Watch permissions field
  const formPerms = watch('permissions');

  // Group permissions by source
  const groupedPermissions = useMemo(() => {
    if (!permissionsList?.data) return {};
    return permissionsList.data.reduce((acc, perm) => {
      if (!acc[perm.source]) acc[perm.source] = [];
      acc[perm.source].push(perm);
      return acc;
    }, {} as Record<string, typeof permissionsList.data>);
  }, [permissionsList]);

  // Toggle permission in form
  const togglePerm = (id: string) => {
    const current = formPerms || [];
    if (current.includes(id)) {
      setValue('permissions', current.filter(pid => pid !== id));
    } else {
      setValue('permissions', [...current, id]);
    }
  };

  // Populate form when editing an existing role
  useEffect(() => {
    if (isEdit) {
      reset({
        name: editRole.name,
        displayName: editRole.displayName,
        description: editRole.description ?? '',
        permissions: editRole.permissions?.map(p => p.id) || [],
      });
    } else {
      reset({ name: '', displayName: '', description: '', permissions: [] });
    }
  }, [editRole, isEdit, modalOpen, reset]);

  const createMutation = useMutation({
    mutationFn: (values: UpsertRoleFormValues) =>
      adminRoleService.create({
        name: values.name,
        displayName: values.displayName,
        description: values.description ?? null,
        permissions: values.permissions,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: roleKeys.all });
      toast({ title: 'Role Created', description: 'The new role has been created successfully.' });
      setModalOpen(false);
    },
    onError: (err: Error) => {
      toast({ title: 'Failed to create role', description: err.message, variant: 'destructive' });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (values: UpsertRoleFormValues) =>
      adminRoleService.update(editRole.id, {
        name: values.name,
        displayName: values.displayName,
        description: values.description ?? null,
        permissions: values.permissions,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: roleKeys.all });
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
    if (isEdit) {
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


          <div className="space-y-3">
            <Label>Permissions</Label>
            {Object.entries(groupedPermissions).map(([source, perms]) => (
              <div key={source} className="space-y-2">
                <p className="text-sm font-medium capitalize">{source.replace(/_/g, ' ')}</p>
                <div className="flex flex-wrap gap-3 ml-2">
                  {perms.map(perm => (
                    <label key={perm.id} className="flex items-center gap-1.5 text-sm">
                      <Checkbox
                        checked={formPerms?.includes(perm.id) || false}
                        onCheckedChange={() => togglePerm(perm.id)}
                      />
                      <span className="capitalize">{perm.displayName}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
            {errors.permissions && (
              <p className="text-sm text-destructive">{errors.permissions.message}</p>
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
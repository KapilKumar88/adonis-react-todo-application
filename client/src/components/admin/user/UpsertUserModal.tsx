import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SaveIcon } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { adminUserService } from '@/services/admin/user.service';
import type { AdminUser, CreateUserPayload, UpdateUserPayload } from '@/types/user.types';
import { toast } from '@/hooks/use-toast';
import { UpsertUserFormValues, upsertUserSchema } from '@/validations/admin/user.validation';
import { firstLetterUpperCase } from '@/utils/helpers';
import LoadingButton from '@/components/common/LoadingButton';
import { useRoles } from '@/hooks/useRole';

export default function UpsertUserModal({
    modalOpen,
    setModalOpen,
    editUser,
    onSuccess,
}: Readonly<{
    modalOpen: boolean;
    setModalOpen: (open: boolean) => void;
    editUser: AdminUser | null;
    onSuccess: () => void;
}>) {
    const isEdit = editUser !== null;

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<UpsertUserFormValues>({
        resolver: yupResolver(upsertUserSchema),
        defaultValues: {
            fullName: '',
            email: '',
            roleId: '',
        },
        context: { isEdit },
    });

    // Populate form when editing
    useEffect(() => {
        if (modalOpen) {
            reset(
                isEdit
                    ? { fullName: editUser?.fullName, email: editUser?.email, roleId: editUser?.role?.id }
                    : { fullName: '', email: '', roleId: '' },
            );
        }
    }, [modalOpen, editUser, reset]);

    const { data: rolesData } = useRoles();

    const createMutation = useMutation({
        mutationFn: (payload: CreateUserPayload) => adminUserService.create(payload),
        onSuccess: () => {
            onSuccess();
            toast({ title: 'User Created' });
            setModalOpen(false);
        },
        onError: (err: Error) =>
            toast({ title: 'Error', description: err.message, variant: 'destructive' }),
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: UpdateUserPayload }) =>
            adminUserService.update(id, payload),
        onSuccess: () => {
            onSuccess();
            toast({ title: 'User Updated' });
            setModalOpen(false);
        },
        onError: (err: Error) =>
            toast({ title: 'Error', description: err.message, variant: 'destructive' }),
    });

    const isSaving = createMutation.isPending || updateMutation.isPending;
    const roles = rolesData?.data ?? [];

    const onSubmit = (values: UpsertUserFormValues) => {
        if (isEdit && editUser) {
            const payload: UpdateUserPayload = {
                fullName: values.fullName,
                email: values.email,
                roleId: values.roleId,
            };
            updateMutation.mutate({ id: editUser.id, payload });
        } else {
            const payload: CreateUserPayload = {
                fullName: values.fullName,
                email: values.email,
                roleId: values.roleId,
            };
            createMutation.mutate(payload);
        }
    };

    return (
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{isEdit ? 'Edit User' : 'Add User'}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Full Name */}
                    <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name <span className="text-destructive">*</span></Label>
                        <Input id="fullName" {...register('fullName')} />
                        {errors.fullName && (
                            <p className="text-xs text-destructive">{errors.fullName.message}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <Label htmlFor="email">
                            Email <span className="text-destructive">*</span>
                        </Label>
                        <Input id="email" type="email" {...register('email')} />
                        {errors?.email && (
                            <p className="text-xs text-destructive">{errors?.email?.message}</p>
                        )}
                    </div>

                    {/* Role */}
                    <div className="space-y-2">
                        <Label>Role <span className="text-destructive">*</span></Label>
                        <Controller
                            name="roleId"
                            control={control}
                            render={({ field }) => {
                                return (
                                    <Select
                                        value={field.value === null ? 'none' : String(field.value)}
                                        onValueChange={v => {
                                            console.log(v, 'selected value');
                                            field.onChange(v === 'none' ? null : v);
                                        }}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="none">No Role</SelectItem>
                                            {roles?.map(r => (
                                                <SelectItem key={r.id} value={String(r.id)}>
                                                    {firstLetterUpperCase(r.displayName ?? r.name)}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )
                            }}
                        />
                        {errors?.roleId && (
                            <p className="text-xs text-destructive">{errors?.roleId?.message}</p>
                        )}
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setModalOpen(false)}
                            disabled={isSaving}
                        >
                            Cancel
                        </Button>
                        <LoadingButton type="submit" disabled={isSaving} isLoading={isSaving} label={isEdit ? 'Save' : 'Create'} icon={SaveIcon} />
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
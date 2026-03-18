import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InferType } from 'yup';
import { useMutation } from '@tanstack/react-query';
import { Eye, EyeOff } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { changePasswordSchema } from '@/validations/user/profile.validation';
import { userProfileService } from '@/services/user/profile.service';
import LoadingButton from '@/components/common/LoadingButton';

type ChangePasswordFormValues = InferType<typeof changePasswordSchema>;

export default function ChangePassword() {
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ChangePasswordFormValues>({
        resolver: yupResolver(changePasswordSchema),
        defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' },
    });

    const { mutate: changePassword, isPending } = useMutation({
        mutationFn: userProfileService.changePassword,
        onSuccess: (data) => {
            toast({ title: 'Password changed', description: data.message });
            reset();
        },
        onError: (error: Error) => {
            toast({
                title: 'Failed to change password',
                description: error.message ?? 'Could not change password.',
                variant: 'destructive',
            });
        },
    });

    const onSubmit = (values: ChangePasswordFormValues) => {
        changePassword({
            currentPassword: values.currentPassword,
            newPassword: values.newPassword,
            confirmPassword: values.confirmPassword,
        });
    };

    return (
        <Card>
            <CardHeader><CardTitle>Change Password</CardTitle></CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <div className="relative">
                            <Input id="currentPassword" type={showCurrent ? 'text' : 'password'} {...register('currentPassword')} />
                            <Button type="button" variant="ghost" size="icon" className="absolute right-0 top-0 h-full px-3" onClick={() => setShowCurrent(!showCurrent)}>
                                {showCurrent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                        </div>
                        {errors.currentPassword && <p className="text-sm text-destructive">{errors.currentPassword.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <div className="relative">
                            <Input id="newPassword" type={showNew ? 'text' : 'password'} {...register('newPassword')} />
                            <Button type="button" variant="ghost" size="icon" className="absolute right-0 top-0 h-full px-3" onClick={() => setShowNew(!showNew)}>
                                {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                        </div>
                        {errors.newPassword && <p className="text-sm text-destructive">{errors.newPassword.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input id="confirmPassword" type="password" {...register('confirmPassword')} />
                        {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>}
                    </div>
                    <LoadingButton type="submit" disabled={isPending} isLoading={isPending} label={isPending ? 'Updating...' : 'Update Password'} />
                </form>
            </CardContent>
        </Card>
    );
}
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InferType } from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from '@/hooks/use-toast';
import { UserDetails } from '@/types/user.types';
import { profileUpdateSchema } from '@/validations/user/profile.validation';
import { ApiUserProfileResponse, userProfileKeys, userProfileService } from '@/services/user/profile.service';
import LoadingButton from '@/components/common/LoadingButton';
import { useUserProfile } from '@/context/UserProfileContext';

type ProfileFormValues = InferType<typeof profileUpdateSchema>;

export default function PersonalInfo({
    userInfo,
}: Readonly<{
    userInfo: UserDetails
}>) {
    const { setUserInfo } = useUserProfile();
    const queryClient = useQueryClient();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty },
    } = useForm<ProfileFormValues>({
        resolver: yupResolver(profileUpdateSchema),
        defaultValues: {
            fullName: userInfo.fullName ?? '',
            bio: userInfo.bio ?? '',
        },
    });

    const { mutate: updateProfile, isPending } = useMutation<ApiUserProfileResponse, Error, FormData>({
        mutationFn: userProfileService.updateProfile,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: userProfileKeys.profile });
            setSelectedFile(null);
            setImagePreview(null);
            setUserInfo((previousState) => {
                return {
                    ...previousState,
                    fullName: data.data.fullName,
                    bio: data.data.bio,
                    profileImage: data.data.profileImage,
                }
            });
            toast({ title: 'Profile updated', description: 'Your profile has been saved.' });
        },
        onError: (error) => {
            toast({
                title: 'Update failed',
                description: error.message ?? 'Could not update profile.',
                variant: 'destructive',
            });
        },
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setSelectedFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const onSubmit = (values: ProfileFormValues) => {
        const formData = new FormData();
        formData.append('fullName', values.fullName);
        if (values?.bio) formData.append('bio', values.bio);
        if (selectedFile) formData.append('profileImage', selectedFile);
        updateProfile(formData);
    };

    const avatarSrc = imagePreview ?? (userInfo?.profileImage ? userInfo?.profileImage : undefined);

    return (
        <Card>
            <CardHeader><CardTitle>Personal Info</CardTitle></CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="flex items-center gap-4 mb-4">
                        <Avatar className="h-16 w-16">
                            {avatarSrc && <AvatarImage src={avatarSrc} alt={userInfo?.fullName} />}
                            <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                                {userInfo?.initials}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                                Upload Photo
                            </Button>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/jpeg,image/png,image/gif,image/webp"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                            {selectedFile && (
                                <p className="text-xs text-muted-foreground mt-1">{selectedFile.name}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input id="fullName" {...register('fullName')} />
                        {errors.fullName && <p className="text-sm text-destructive">{errors.fullName.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label>Email</Label>
                        <Input value={userInfo?.email} disabled />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea id="bio" rows={3} {...register('bio')} />
                        {errors.bio && <p className="text-sm text-destructive">{errors.bio.message}</p>}
                    </div>

                    <LoadingButton type="submit" isLoading={isPending} disabled={isPending || (!isDirty && !selectedFile)} label={isPending ? 'Saving...' : 'Save Changes'} />
                </form>
            </CardContent>
        </Card>
    );
}
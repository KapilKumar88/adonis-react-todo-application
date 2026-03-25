import ConfirmDialog from '@/components/common/ConfirmDialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { adminRoleService } from '@/services/admin/role.service';
import { roleKeys } from '@/services/admin/user.service';
import { AdminSideRoleType, ROLE_TYPES } from '@/types/role.types';
import { firstLetterUpperCase } from '@/utils/helpers';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';


export default function RoleCard({
    role,
    onEdit
}: Readonly<{
    role: AdminSideRoleType,
    onEdit: () => void;
}>) {
    const queryClient = useQueryClient();
    const [deleteConfirm, setDeleteConfirm] = useState<boolean>(false);


    const { mutate: deleteRole, isPending } = useMutation<void, Error, string>({
        mutationFn: adminRoleService.remove,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: roleKeys.all });
            toast({ title: 'Role Deleted' });
            setDeleteConfirm(false);
        },
        onError: (error) => {
            toast({
                title: 'Delete Failed',
                description: error.message ?? 'Unable to delete role.',
                variant: 'destructive',
            });
        },
    });


    const handleDelete = (id: string) => {
        deleteRole(id);
    };

    return (
        <>
            <Card>
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{firstLetterUpperCase(role.name)}</CardTitle>
                        <div>
                            <Badge variant="outline">{role?.permissions?.length ?? 0} perms</Badge>
                            <Badge variant="outline" className="text-xs capitalize">{role?.type}</Badge>
                        </div>
                    </div>
                    <CardDescription>{role.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-1">
                        {role.permissions.slice(0, 5).map(p => (
                            <Badge key={p.id} variant="secondary" className="text-xs">{p.displayName}</Badge>
                        ))}
                        {role.permissions.length > 5 && (
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <span>
                                            <Badge variant="outline" className="text-xs cursor-pointer">
                                                +{role.permissions.length - 5} more
                                            </Badge>
                                        </span>
                                    </TooltipTrigger>
                                    <TooltipContent className="max-w-xs whitespace-pre-line">
                                        <ul className="list-disc list-inside mb-2">
                                            {role.permissions.slice(5).map(p => (
                                                <li key={p.id}>{p.displayName}</li>
                                            ))}
                                        </ul>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">
                        {role?.usersCount ?? 0} users
                    </p>
                </CardContent>
                <CardFooter className="gap-2">
                    {role.type !== ROLE_TYPES.SYSTEM && (
                        <>
                            <Button variant="outline" size="sm" onClick={() => onEdit()}>
                                <Pencil className="h-3 w-3 mr-1" /> Edit
                            </Button>
                            <Button variant="outline" size="sm" className="text-destructive" onClick={() => setDeleteConfirm(true)} disabled={isPending}>
                                <Trash2 className="h-3 w-3 mr-1" /> Delete
                                {
                                    isPending && <span className="ml-2 text-xs">Deleting...</span>
                                }
                            </Button>
                        </>
                    )}
                </CardFooter>
            </Card>
            <ConfirmDialog
                open={deleteConfirm}
                onOpenChange={() => setDeleteConfirm(false)}
                title="Delete Role"
                description="This will remove the role. Users with this role won't be affected."
                onConfirm={() => deleteConfirm && handleDelete(role.id)}
            />
        </>
    );
}
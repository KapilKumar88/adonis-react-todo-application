import ConfirmDialog from '@/components/common/ConfirmDialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { adminRoleService } from '@/services/admin/role.service';
import { AdminRole, USER_ROLE } from '@/types/role.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';


export default function RoleCard({
    role,
    onEdit
}: Readonly<{
    role: AdminRole,
    onEdit: () => void;
}>) {
    const queryClient = useQueryClient();
    const [deleteConfirm, setDeleteConfirm] = useState<boolean>(false);


    const { mutate: deleteRole, isPending } = useMutation<void, Error, string>({
        mutationFn: adminRoleService.remove,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['roles'] });
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
                        <CardTitle className="text-lg">{role.name}</CardTitle>
                        {/* <Badge variant="outline">{role.permissions.length} perms</Badge> */}
                    </div>
                    <CardDescription>{role.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-1">
                        {/* {role.permissions.slice(0, 5).map(p => (
                        <Badge key={p.id} variant="secondary" className="text-xs">{p.name}</Badge>
                    ))}
                    {role.permissions.length > 5 && <Badge variant="outline" className="text-xs">+{role.permissions.length - 5} more</Badge>} */}
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">
                        {/* {allUsers.filter(u => u.role === role.name.toLowerCase()).length} users */}
                    </p>
                </CardContent>
                <CardFooter className="gap-2">
                    {role.name !== USER_ROLE.SUPER_ADMIN && (
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
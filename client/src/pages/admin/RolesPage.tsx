import React, { useState } from 'react';
import { Plus, Pencil, Trash2, KeyRound } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import PageHeader from '@/components/common/PageHeader';
import EmptyState from '@/components/common/EmptyState';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { roles as mockRoles, permissions as allPermissions } from '@/utils/mockData';
import { useAuth } from '@/context/AuthContext';
import { Role, Permission } from '@/types';
import { generateId } from '@/utils/helpers';
import { toast } from '@/hooks/use-toast';

const resources = [...new Set(allPermissions.map(p => p.resource))];

const RolesPage: React.FC = () => {
  const [roles, setRoles] = useLocalStorage<Role[]>('todo-roles', mockRoles);
  const { allUsers } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [editRole, setEditRole] = useState<Role | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [formName, setFormName] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formPerms, setFormPerms] = useState<string[]>([]);

  const openModal = (role?: Role) => {
    if (role) {
      setEditRole(role);
      setFormName(role.name);
      setFormDesc(role.description);
      setFormPerms(role.permissions.map(p => p.id));
    } else {
      setEditRole(null);
      setFormName(''); setFormDesc(''); setFormPerms([]);
    }
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!formName) return;
    const perms = allPermissions.filter(p => formPerms.includes(p.id));
    if (editRole) {
      setRoles(prev => prev.map(r => r.id === editRole.id ? { ...r, name: formName, description: formDesc, permissions: perms } : r));
      toast({ title: 'Role Updated' });
    } else {
      setRoles(prev => [...prev, { id: generateId(), name: formName, description: formDesc, permissions: perms, createdAt: new Date().toISOString() }]);
      toast({ title: 'Role Created' });
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setRoles(prev => prev.filter(r => r.id !== id));
    setDeleteConfirm(null);
    toast({ title: 'Role Deleted' });
  };

  const togglePerm = (permId: string) => setFormPerms(prev => prev.includes(permId) ? prev.filter(x => x !== permId) : [...prev, permId]);

  return (
    <div>
      <PageHeader title="Roles Management" subtitle={`${roles.length} roles`} actions={
        <Button onClick={() => openModal()}><Plus className="h-4 w-4 mr-1" /> Add Role</Button>
      } />

      {roles.length === 0 ? (
        <EmptyState icon={KeyRound} title="No roles" description="Create your first role." actionLabel="Add Role" onAction={() => openModal()} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {roles.map(role => (
            <Card key={role.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{role.name}</CardTitle>
                  <Badge variant="outline">{role.permissions.length} perms</Badge>
                </div>
                <CardDescription>{role.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1">
                  {role.permissions.slice(0, 5).map(p => (
                    <Badge key={p.id} variant="secondary" className="text-xs">{p.name}</Badge>
                  ))}
                  {role.permissions.length > 5 && <Badge variant="outline" className="text-xs">+{role.permissions.length - 5} more</Badge>}
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  {allUsers.filter(u => u.role === role.name.toLowerCase()).length} users
                </p>
              </CardContent>
              <CardFooter className="gap-2">
                <Button variant="outline" size="sm" onClick={() => openModal(role)}><Pencil className="h-3 w-3 mr-1" /> Edit</Button>
                {role.name !== 'Admin' && (
                  <Button variant="outline" size="sm" className="text-destructive" onClick={() => setDeleteConfirm(role.id)}>
                    <Trash2 className="h-3 w-3 mr-1" /> Delete
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editRole ? 'Edit Role' : 'Add Role'}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2"><Label>Role Name</Label><Input value={formName} onChange={e => setFormName(e.target.value)} /></div>
            <div className="space-y-2"><Label>Description</Label><Textarea value={formDesc} onChange={e => setFormDesc(e.target.value)} rows={2} /></div>
            <div className="space-y-3">
              <Label>Permissions</Label>
              {resources.map(resource => (
                <div key={resource} className="space-y-2">
                  <p className="text-sm font-medium capitalize">{resource}</p>
                  <div className="flex flex-wrap gap-3 ml-2">
                    {allPermissions.filter(p => p.resource === resource).map(perm => (
                      <label key={perm.id} className="flex items-center gap-1.5 text-sm">
                        <Checkbox checked={formPerms.includes(perm.id)} onCheckedChange={() => togglePerm(perm.id)} />
                        <span className="capitalize">{perm.action}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>{editRole ? 'Save' : 'Create'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmDialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)} title="Delete Role" description="This will remove the role. Users with this role won't be affected." onConfirm={() => deleteConfirm && handleDelete(deleteConfirm)} />
    </div>
  );
};

export default RolesPage;

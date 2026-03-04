import React, { useState, useMemo } from 'react';
import { Plus, Search, Trash2, Pencil, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import PageHeader from '@/components/common/PageHeader';
import { StatusBadge, RoleBadge } from '@/components/common/StatusBadge';
import EmptyState from '@/components/common/EmptyState';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import { useAuth } from '@/context/AuthContext';
import { useTodos } from '@/context/TodoContext';
import { User } from '@/types';
import { getInitials, formatDate, formatRelativeTime, generateId } from '@/utils/helpers';
import { toast } from '@/hooks/use-toast';
import { Users } from 'lucide-react';

const UsersPage: React.FC = () => {
  const { allUsers, setAllUsers } = useAuth();
  const { todos } = useTodos();
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selected, setSelected] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);

  // Form state
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPassword, setFormPassword] = useState('');
  const [formRole, setFormRole] = useState<User['role']>('user');
  const [formStatus, setFormStatus] = useState<User['status']>('active');

  const openModal = (user?: User) => {
    if (user) {
      setEditUser(user);
      setFormName(user.name);
      setFormEmail(user.email);
      setFormPassword('');
      setFormRole(user.role);
      setFormStatus(user.status);
    } else {
      setEditUser(null);
      setFormName(''); setFormEmail(''); setFormPassword(''); setFormRole('user'); setFormStatus('active');
    }
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!formName || !formEmail) return;
    if (editUser) {
      setAllUsers(prev => prev.map(u => u.id === editUser.id ? { ...u, name: formName, email: formEmail, role: formRole, status: formStatus, ...(formPassword ? { password: formPassword } : {}) } : u));
      toast({ title: 'User Updated' });
    } else {
      if (!formPassword) return;
      setAllUsers(prev => [...prev, { id: generateId(), name: formName, email: formEmail, password: formPassword, role: formRole, status: formStatus, permissions: [], createdAt: new Date().toISOString() }]);
      toast({ title: 'User Created' });
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setAllUsers(prev => prev.filter(u => u.id !== id));
    setDeleteConfirm(null);
    toast({ title: 'User Deleted' });
  };

  const toggleStatus = (user: User) => {
    const newStatus = user.status === 'active' ? 'inactive' : 'active';
    setAllUsers(prev => prev.map(u => u.id === user.id ? { ...u, status: newStatus } : u));
    toast({ title: `User ${newStatus}` });
  };

  const filtered = useMemo(() => {
    let result = allUsers;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
    }
    if (roleFilter !== 'all') result = result.filter(u => u.role === roleFilter);
    if (statusFilter !== 'all') result = result.filter(u => u.status === statusFilter);
    return result;
  }, [allUsers, search, roleFilter, statusFilter]);

  const paginated = filtered.slice(page * perPage, (page + 1) * perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

  return (
    <div>
      <PageHeader title="User Management" subtitle={`${filtered.length} users`} actions={
        <Button onClick={() => openModal()}><Plus className="h-4 w-4 mr-1" /> Add User</Button>
      } />

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search users..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-[130px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="moderator">Moderator</SelectItem>
            <SelectItem value="user">User</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[130px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="banned">Banned</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {paginated.length === 0 ? (
        <EmptyState icon={Users} title="No users found" description="Adjust your filters or add a new user." actionLabel="Add User" onAction={() => openModal()} />
      ) : (
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10"><Checkbox checked={selected.length === paginated.length && paginated.length > 0} onCheckedChange={() => setSelected(selected.length === paginated.length ? [] : paginated.map(u => u.id))} /></TableHead>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Todos</TableHead>
                <TableHead className="hidden md:table-cell">Last Login</TableHead>
                <TableHead className="hidden lg:table-cell">Joined</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.map(user => (
                <TableRow key={user.id}>
                  <TableCell><Checkbox checked={selected.includes(user.id)} onCheckedChange={() => setSelected(prev => prev.includes(user.id) ? prev.filter(x => x !== user.id) : [...prev, user.id])} /></TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8"><AvatarFallback className="text-xs bg-muted">{getInitials(user.name)}</AvatarFallback></Avatar>
                      <div>
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell><RoleBadge role={user.role} /></TableCell>
                  <TableCell>
                    <button onClick={() => toggleStatus(user)}>
                      <StatusBadge status={user.status} />
                    </button>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm">{todos.filter(t => t.userId === user.id).length}</TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{user.lastLogin ? formatRelativeTime(user.lastLogin) : '—'}</TableCell>
                  <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">{formatDate(user.createdAt)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openModal(user)}><Pencil className="h-3.5 w-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => setDeleteConfirm(user.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <Select value={String(perPage)} onValueChange={v => { setPerPage(Number(v)); setPage(0); }}>
            <SelectTrigger className="w-[100px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10 / page</SelectItem>
              <SelectItem value="25">25 / page</SelectItem>
              <SelectItem value="50">50 / page</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled={page === 0} onClick={() => setPage(p => p - 1)}>Previous</Button>
            <span className="text-sm py-1 px-2">{page + 1} / {totalPages}</span>
            <Button variant="outline" size="sm" disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)}>Next</Button>
          </div>
        </div>
      )}

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editUser ? 'Edit User' : 'Add User'}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2"><Label>Full Name</Label><Input value={formName} onChange={e => setFormName(e.target.value)} required /></div>
            <div className="space-y-2"><Label>Email</Label><Input type="email" value={formEmail} onChange={e => setFormEmail(e.target.value)} required /></div>
            {!editUser && <div className="space-y-2"><Label>Password</Label><Input type="password" value={formPassword} onChange={e => setFormPassword(e.target.value)} required /></div>}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Role</Label>
                <Select value={formRole} onValueChange={v => setFormRole(v as User['role'])}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="moderator">Moderator</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={formStatus} onValueChange={v => setFormStatus(v as User['status'])}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="banned">Banned</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>{editUser ? 'Save' : 'Create'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmDialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)} title="Delete User" description="This action cannot be undone." onConfirm={() => deleteConfirm && handleDelete(deleteConfirm)} />
    </div>
  );
};

export default UsersPage;

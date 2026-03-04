import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import PageHeader from '@/components/common/PageHeader';
import { useAuth } from '@/context/AuthContext';
import { useTodos } from '@/context/TodoContext';
import { getInitials, formatDate } from '@/utils/helpers';
import { toast } from '@/hooks/use-toast';

const ProfilePage: React.FC = () => {
  const { currentUser, updateProfile } = useAuth();
  const { userTodos } = useTodos();
  const [name, setName] = useState(currentUser?.name || '');
  const [bio, setBio] = useState(currentUser?.bio || '');
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');

  if (!currentUser) return null;

  const handleSave = () => {
    updateProfile({ name, bio });
    toast({ title: 'Profile Updated' });
  };

  const handleChangePassword = () => {
    if (currentPw !== currentUser.password) {
      toast({ title: 'Error', description: 'Current password is incorrect.', variant: 'destructive' });
      return;
    }
    if (newPw !== confirmPw) {
      toast({ title: 'Error', description: 'Passwords do not match.', variant: 'destructive' });
      return;
    }
    if (newPw.length < 6) {
      toast({ title: 'Error', description: 'Password must be at least 6 characters.', variant: 'destructive' });
      return;
    }
    updateProfile({ password: newPw });
    setCurrentPw(''); setNewPw(''); setConfirmPw('');
    toast({ title: 'Password Changed' });
  };

  const completedCount = userTodos.filter(t => t.status === 'completed').length;

  return (
    <div>
      <PageHeader title="Profile" subtitle="Manage your account" />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader><CardTitle>Personal Info</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                    {getInitials(currentUser.name)}
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">Upload Photo</Button>
              </div>
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input value={currentUser.email} disabled />
              </div>
              <div className="space-y-2">
                <Label>Bio</Label>
                <Textarea value={bio} onChange={e => setBio(e.target.value)} rows={3} />
              </div>
              <Button onClick={handleSave}>Save Changes</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Change Password</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Current Password</Label>
                <Input type="password" value={currentPw} onChange={e => setCurrentPw(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>New Password</Label>
                <Input type="password" value={newPw} onChange={e => setNewPw(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Confirm Password</Label>
                <Input type="password" value={confirmPw} onChange={e => setConfirmPw(e.target.value)} />
              </div>
              <Button onClick={handleChangePassword}>Update Password</Button>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader><CardTitle>Account Stats</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Member since</span>
                <span>{formatDate(currentUser.createdAt)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Todos</span>
                <span>{userTodos.length}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Completed</span>
                <span>{completedCount}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Role</span>
                <span className="capitalize">{currentUser.role}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

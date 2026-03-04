import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import PageHeader from '@/components/common/PageHeader';
import { useTheme } from '@/context/ThemeContext';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const accentColors = [
  { name: 'Indigo', value: '239 84% 67%' },
  { name: 'Violet', value: '263 70% 50%' },
  { name: 'Pink', value: '330 81% 60%' },
  { name: 'Blue', value: '217 91% 60%' },
  { name: 'Emerald', value: '160 84% 39%' },
  { name: 'Amber', value: '38 92% 50%' },
];

const SettingsPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const handleSave = () => toast({ title: 'Settings Saved' });

  return (
    <div>
      <PageHeader title="Settings" subtitle="Configure application preferences" />

      <Tabs defaultValue="general">
        <TabsList className="mb-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Basic application configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2"><Label>Application Name</Label><Input defaultValue="TodoApp" /></div>
              <div className="space-y-2"><Label>Application URL</Label><Input defaultValue="https://todoapp.example.com" disabled /></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Default User Role</Label>
                  <Select defaultValue="user">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="moderator">Moderator</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Max Todos per User</Label>
                  <Input type="number" defaultValue="100" />
                </div>
              </div>
              <Button onClick={handleSave}>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize the look and feel</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Theme</Label>
                <div className="flex gap-3">
                  {(['light', 'dark'] as const).map(t => (
                    <button
                      key={t}
                      onClick={() => { if (theme !== t) toggleTheme(); }}
                      className={cn('px-4 py-2 rounded-md border text-sm capitalize transition-colors',
                        theme === t ? 'border-primary bg-primary/10 text-primary' : 'border-border')}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Accent Color</Label>
                <div className="flex gap-3">
                  {accentColors.map(c => (
                    <button key={c.name} title={c.name}
                      className="w-8 h-8 rounded-full border-2 border-border hover:scale-110 transition-transform"
                      style={{ backgroundColor: `hsl(${c.value})` }}
                      onClick={() => toast({ title: `Accent: ${c.name}`, description: 'Preview only — accent color switching coming soon.' })}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>Authentication and access settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Session Timeout</Label>
                <Select defaultValue="30">
                  <SelectTrigger className="w-[200px]"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <Label>Require Email Verification</Label>
                  <p className="text-xs text-muted-foreground">New users must verify email before accessing</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-xs text-muted-foreground">Require 2FA for admin accounts</p>
                </div>
                <Switch />
              </div>
              <div className="space-y-2">
                <Label>Login Attempt Limit</Label>
                <Input type="number" defaultValue="5" className="w-[200px]" />
              </div>
              <Button onClick={handleSave}>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Email notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: 'New User Registration', desc: 'Get notified when a new user signs up', defaultChecked: true },
                { label: 'Failed Login Attempts', desc: 'Alert on multiple failed login attempts', defaultChecked: true },
                { label: 'User Status Changes', desc: 'Notify when a user is activated/deactivated', defaultChecked: false },
                { label: 'Role Changes', desc: 'Notify when user roles are modified', defaultChecked: false },
                { label: 'System Updates', desc: 'Get notified about system maintenance', defaultChecked: true },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between py-2">
                  <div>
                    <Label>{item.label}</Label>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch defaultChecked={item.defaultChecked} />
                </div>
              ))}
              <Button onClick={handleSave}>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;

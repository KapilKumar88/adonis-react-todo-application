import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, KeyRound, ShieldCheck, ScrollText, Settings, LogOut, CheckSquare } from 'lucide-react';
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger, useSidebar,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import ThemeToggle from '@/components/common/ThemeToggle';
import { NavLink } from '@/components/NavLink';
import { useAuth } from '@/context/AuthContext';
import { getInitials } from '@/utils/helpers';

const navItems = [
  { title: 'Dashboard', url: '/admin/dashboard', icon: LayoutDashboard },
  { title: 'Users', url: '/admin/users', icon: Users },
  { title: 'Roles', url: '/admin/roles', icon: KeyRound },
  { title: 'Permissions', url: '/admin/permissions', icon: ShieldCheck },
  { title: 'Activity Logs', url: '/admin/logs', icon: ScrollText },
  { title: 'Settings', url: '/admin/settings', icon: Settings },
];

function AdminSidebar() {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="flex flex-col h-full">
        <div className="p-4 flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
            <CheckSquare className="h-4 w-4 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm">TodoApp</span>
              <Badge variant="outline" className="text-[10px] px-1.5 py-0">Admin</Badge>
            </div>
          )}
        </div>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map(item => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className="hover:bg-muted/50" activeClassName="bg-muted text-primary font-medium">
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <div className="mt-auto p-4">
          <Separator className="mb-4" />
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                {currentUser ? getInitials(currentUser.name) : '?'}
              </AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{currentUser?.name}</p>
                <p className="text-xs text-muted-foreground truncate">{currentUser?.email}</p>
              </div>
            )}
            {!collapsed && (
              <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={() => { logout(); navigate('/admin/login'); }}>
                <LogOut className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}

const AdminLayout: React.FC = () => {
  const location = useLocation();
  const currentNav = navItems.find(i => location.pathname.startsWith(i.url));

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-14 border-b flex items-center justify-between px-4 bg-background/80 backdrop-blur-sm sticky top-0 z-40">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <div>
                <h2 className="text-sm font-semibold">{currentNav?.title || 'Admin'}</h2>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
            </div>
          </header>
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;

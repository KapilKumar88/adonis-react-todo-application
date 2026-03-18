import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { CheckSquare, LayoutDashboard, ListTodo, UserCircle, Bell, Menu, X, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ThemeToggle from '@/components/common/ThemeToggle';
import { getInitials } from '@/utils/helpers';
import { NavLink } from '@/components/NavLink';
import { useUserProfile } from '@/context/UserProfileContext';
import { PERMISSIONS } from '@/constants/permission.constant';

const navItems = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard, permission: PERMISSIONS.USER_DASHBOARD.VIEW },
  { label: 'My Todos', to: '/todos', icon: ListTodo, permission: PERMISSIONS.TODO_MANAGEMENT.VIEW },
  { label: 'Profile', to: '/profile', icon: UserCircle, permission: null },
];

const UserLayout: React.FC = () => {
  const { userInfo } = useUserProfile();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const userPermissions = userInfo?.roles?.permissions ?? [];
  const visibleNavItems = navItems.filter(item => !item.permission || userPermissions.includes(item.permission));

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between h-14 px-4">
          <div className="flex items-center gap-6">
            <Link to="/dashboard" className="flex items-center gap-2 font-bold text-lg">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <CheckSquare className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="hidden sm:inline">TodoApp</span>
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              {visibleNavItems.map(item => (
                <NavLink key={item.to} to={item.to} className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors" activeClassName="text-foreground bg-muted">
                  <item.icon className="h-4 w-4 mr-1.5 inline" />
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-accent" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                      {userInfo ? getInitials(userInfo?.fullName) : '?'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{userInfo?.fullName}</p>
                  <p className="text-xs text-muted-foreground">{userInfo?.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/profile')}>Profile</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                  <LogOut className="h-4 w-4 mr-2" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        {mobileOpen && (
          <nav className="md:hidden border-t px-4 py-2 space-y-1">
            {visibleNavItems.map(item => (
              <NavLink key={item.to} to={item.to} className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-muted-foreground hover:bg-muted" activeClassName="text-foreground bg-muted" onClick={() => setMobileOpen(false)}>
                <item.icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            ))}
          </nav>
        )}
      </header>
      <main className="flex-1 container mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";

// User pages
import LoginPage from "@/pages/user/auth/LoginPage";
import RegisterPage from "@/pages/user/auth/RegisterPage";
import ForgotPasswordPage from "@/pages/user/auth/ForgotPasswordPage";
import ResetPasswordPage from "@/pages/user/auth/ResetPasswordPage";
import UserLayout from "@/layouts/UserLayout";
import DashboardPage from "@/pages/user/DashboardPage";
import TodosPage from "@/pages/user/TodosPage";
import ProfilePage from "@/pages/user/ProfilePage";

// Admin pages
import AdminLoginPage from "@/pages/admin/auth/AdminLoginPage";
import AdminLayout from "@/layouts/AdminLayout";
import AdminDashboardPage from "@/pages/admin/AdminDashboardPage";
import UsersPage from "@/pages/admin/UsersPage";
import RolesPage from "@/pages/admin/RolesPage";
import PermissionsPage from "@/pages/admin/PermissionsPage";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { UserProfileProvider } from "./context/UserProfileContext";
import AuthGuard from "@/guard/AuthGuard";
import { DEFAULT_ROLES } from "./constants/role.constant";
import ErrorBoundary from "@/components/common/ErrorBoundary";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 minute
      gcTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={false} />
    <UserProfileProvider>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner position="top-right" />
          <BrowserRouter>
            <ErrorBoundary>
            <Routes>
              {/* Public routes users */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />


              {/* User protected routes */}
              <Route element={<AuthGuard><UserLayout /></AuthGuard>}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/todos" element={<TodosPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Route>


              {/* Public routes admin */}
              <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
              <Route path="/admin/login" element={<AdminLoginPage />} />


              {/* Admin routes */}
              <Route element={<AuthGuard requiredRole={DEFAULT_ROLES.SUPER_ADMIN}><AdminLayout /></AuthGuard>} >
                <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
                <Route path="/admin/users" element={<UsersPage />} />
                <Route path="/admin/roles" element={<RolesPage />} />
                <Route path="/admin/permissions" element={<PermissionsPage />} />
                {/* <Route path="/admin/logs" element={<ActivityLogsPage />} /> */}
                {/* <Route path="/admin/settings" element={<SettingsPage />} /> */}
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
            </ErrorBoundary>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </UserProfileProvider>
  </QueryClientProvider>
);

export default App;

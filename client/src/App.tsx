import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import { TodoProvider } from "@/context/TodoContext";
import ProtectedRoute from "@/routes/ProtectedRoute";

// User pages
import LoginPage from "@/pages/user/LoginPage";
import RegisterPage from "@/pages/user/RegisterPage";
import ForgotPasswordPage from "@/pages/user/ForgotPasswordPage";
import UserLayout from "@/layouts/UserLayout";
import DashboardPage from "@/pages/user/DashboardPage";
import TodosPage from "@/pages/user/TodosPage";
import ProfilePage from "@/pages/user/ProfilePage";

// Admin pages
import AdminLoginPage from "@/pages/admin/AdminLoginPage";
import AdminLayout from "@/layouts/AdminLayout";
import AdminDashboardPage from "@/pages/admin/AdminDashboardPage";
import UsersPage from "@/pages/admin/UsersPage";
import RolesPage from "@/pages/admin/RolesPage";
import PermissionsPage from "@/pages/admin/PermissionsPage";
import ActivityLogsPage from "@/pages/admin/ActivityLogsPage";
import SettingsPage from "@/pages/admin/SettingsPage";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TodoProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />

                {/* User protected routes */}
                <Route element={<ProtectedRoute><UserLayout /></ProtectedRoute>}>
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/todos" element={<TodosPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                </Route>

                {/* Admin routes */}
                <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
                <Route path="/admin/login" element={<AdminLoginPage />} />
                <Route element={<ProtectedRoute requiredRole="admin"><AdminLayout /></ProtectedRoute>}>
                  <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
                  <Route path="/admin/users" element={<UsersPage />} />
                  <Route path="/admin/roles" element={<RolesPage />} />
                  <Route path="/admin/permissions" element={<PermissionsPage />} />
                  <Route path="/admin/logs" element={<ActivityLogsPage />} />
                  <Route path="/admin/settings" element={<SettingsPage />} />
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </TodoProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

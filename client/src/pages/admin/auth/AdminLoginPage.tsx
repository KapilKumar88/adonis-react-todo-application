import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Shield } from 'lucide-react';
import { useForm, } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { useAdminLogin } from '@/hooks/admin/useAdminLogin';
import { loginSchema } from '@/validations/admin/auth.validation';
import { InferType } from 'yup';
import { tokenStorage } from '@/lib/api-client';
import { useUserProfile } from '@/context/UserProfileContext';

type LoginFormValues = InferType<typeof loginSchema>;

const AdminLoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setUserInfo } = useUserProfile();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const { mutate: adminLogin, isPending } = useAdminLogin({
    onSuccess: ({ data: { token, user } }) => {
      tokenStorage.set(token);
      setUserInfo(user);
      toast({ title: 'Welcome, Admin', description: `Signed in as ${user?.fullName}.` });
      navigate('/admin/dashboard');
    },
    onError: (error) => {
      toast({
        title: 'Login Failed',
        description: error.message ?? 'Invalid credentials.',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    adminLogin({
      email: values.email,
      password: values.password,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md border-primary/20">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <Badge variant="outline" className="mb-2 text-primary border-primary/30">
              Admin Portal
            </Badge>
          </div>
          <div className="flex justify-center mb-2">
            <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center">
              <Shield className="h-7 w-7 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <CardDescription>Sign in to access the admin dashboard</CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <CardContent className="space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@todo.com"
                autoComplete="email"
                disabled={isPending}
                aria-invalid={!!errors.email}
                {...register('email')}
              />
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  disabled={isPending}
                  aria-invalid={!!errors.password}
                  {...register('password')}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword((v) => !v)}
                  disabled={isPending}
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              {errors.password && (
                <p className="text-xs text-destructive">{errors.password.message}</p>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex-col gap-4">
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? 'Signing in…' : 'Sign In as Admin'}
            </Button>
            <Link to="/login" className="text-sm text-muted-foreground hover:text-primary">
              ← Back to User Login
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AdminLoginPage;

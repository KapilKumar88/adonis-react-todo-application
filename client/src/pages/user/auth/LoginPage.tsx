import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InferType } from 'yup';
import { useMutation } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';
import { loginSchema } from '@/validations/user/auth.validation';
import { userAuthService, LoginPayload } from '@/services/user/auth.service';
import { ApiLoginResponse } from '@/types/api.types';
import AppLogo from '@/components/common/AppLogo';
import { tokenStorage } from '@/lib/api-client';
import { useUserProfile } from '@/context/UserProfileContext';
import LoadingButton from '@/components/common/LoadingButton';

type LoginFormValues = InferType<typeof loginSchema>;

const LoginPage: React.FC = () => {
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

  const { mutate: loginMutate, isPending } = useMutation<ApiLoginResponse, Error, LoginPayload>({
    mutationFn: userAuthService.login,
    onSuccess: ({ data: { token, user } }) => {
      tokenStorage.set(token);
      setUserInfo(user);
      toast({ title: 'Welcome back!', description: 'You have logged in successfully.' });
      navigate('/dashboard');
    },
    onError: (error) => {
      toast({
        title: 'Login Failed',
        description: error.message ?? 'Invalid email or password.',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    loginMutate({ email: values.email, password: values.password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <AppLogo onlyLogo />
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>Sign in to your account to continue</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" {...register('email')} />
              {errors?.email && <p className="text-sm text-destructive">{errors?.email?.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••" {...register('password')} />
                <Button type="button" variant="ghost" size="icon" className="absolute right-0 top-0 h-full px-3" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              {errors?.password && <p className="text-sm text-destructive">{errors?.password?.message}</p>}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-sm font-normal">Remember me</Label>
              </div>
              <Link to="/forgot-password" className="text-sm text-primary hover:underline">Forgot password?</Link>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-4">
            <LoadingButton type="submit" className="w-full" isLoading={isPending} disabled={isPending} label={isPending ? 'Signing in...' : 'Sign In'} />
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary hover:underline">Sign up</Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;

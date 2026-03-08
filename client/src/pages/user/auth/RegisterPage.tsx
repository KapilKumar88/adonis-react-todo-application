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
import { signupSchema } from '@/validations/user/auth.validation';
import { userAuthService, SignupPayload } from '@/services/user/auth.service';
import { ApiLoginResponse } from '@/types/api.types';
import { getPasswordStrength } from '@/utils/helpers';
import { cn } from '@/lib/utils';
import AppLogo from '@/components/common/AppLogo';
import { tokenStorage } from '@/lib/api-client';
import { useUserProfile } from '@/context/UserProfileContext';

type SignupFormValues = InferType<typeof signupSchema>;

const RegisterPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setUserInfo } = useUserProfile();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: yupResolver(signupSchema),
    defaultValues: { fullName: '', email: '', password: '', passwordConfirmation: '', terms: false },
  });

  const passwordValue = watch('password');
  const termsValue = watch('terms');
  const strength = passwordValue ? getPasswordStrength(passwordValue) : null;
  const strengthColor = { weak: 'bg-destructive', medium: 'bg-warning', strong: 'bg-success' };
  const strengthWidth = { weak: 'w-1/3', medium: 'w-2/3', strong: 'w-full' };

  const { mutate: signupMutate, isPending } = useMutation<ApiLoginResponse, Error, SignupPayload>({
    mutationFn: userAuthService.signup,
    onSuccess: ({ data: { token, user } }) => {
      tokenStorage.set(token);
      setUserInfo(user);
      toast({ title: 'Account Created', description: 'Welcome! Your account has been created.' });
      navigate('/dashboard');
    },
    onError: (error) => {
      toast({
        title: 'Registration Failed',
        description: error.message ?? 'Could not create account.',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (values: SignupFormValues) => {
    signupMutate({
      fullName: values.fullName,
      email: values.email,
      password: values.password,
      passwordConfirmation: values.passwordConfirmation,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <AppLogo onlyLogo />
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>Get started with your todo manager</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" placeholder="John Doe" {...register('fullName')} />
              {errors.fullName && <p className="text-sm text-destructive">{errors.fullName.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" {...register('email')} />
              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••" {...register('password')} />
                <Button type="button" variant="ghost" size="icon" className="absolute right-0 top-0 h-full px-3" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
              {strength && (
                <div className="space-y-1">
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className={cn('h-full rounded-full transition-all', strengthColor[strength], strengthWidth[strength])} />
                  </div>
                  <p className="text-xs text-muted-foreground capitalize">{strength} password</p>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="passwordConfirmation">Confirm Password</Label>
              <Input id="passwordConfirmation" type="password" placeholder="••••••••" {...register('passwordConfirmation')} />
              {errors.passwordConfirmation && <p className="text-sm text-destructive">{errors.passwordConfirmation.message}</p>}
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" checked={termsValue} onCheckedChange={v => setValue('terms', v === true, { shouldValidate: true })} />
                <Label htmlFor="terms" className="text-sm font-normal">I agree to the Terms & Conditions</Label>
              </div>
              {errors.terms && <p className="text-sm text-destructive">{errors.terms.message}</p>}
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-4">
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? 'Creating account...' : 'Create Account'}
            </Button>
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:underline">Sign in</Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default RegisterPage;

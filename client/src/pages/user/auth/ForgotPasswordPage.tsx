import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, CheckSquare } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InferType } from 'yup';
import { useMutation } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { forgotPasswordSchema } from '@/validations/user/auth.validation';
import { userAuthService, ForgotPasswordPayload, MessageResponse } from '@/services/user/auth.service';
import { maskEmail } from '@/utils/helpers';

type ForgotPasswordFormValues = InferType<typeof forgotPasswordSchema>;

const ForgotPasswordPage: React.FC = () => {
  const [sent, setSent] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const { mutate: forgotPasswordMutate, isPending } = useMutation<MessageResponse, Error, ForgotPasswordPayload>({
    mutationFn: userAuthService.forgotPassword,
    onSuccess: (data) => {
      setSent(true);
      toast({ title: 'Email Sent', description: data.message ?? 'Check your inbox for the reset link.' });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message ?? 'No account found with that email.',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (values: ForgotPasswordFormValues) => {
    setSubmittedEmail(values.email);
    forgotPasswordMutate({ email: values.email });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center">
              {sent ? <Mail className="h-6 w-6 text-primary-foreground" /> : <CheckSquare className="h-6 w-6 text-primary-foreground" />}
            </div>
          </div>
          <CardTitle className="text-2xl">{sent ? 'Check your email' : 'Reset password'}</CardTitle>
          <CardDescription>
            {sent
              ? `We've sent a reset link to ${maskEmail(submittedEmail)}`
              : 'Enter your email to receive a reset link'}
          </CardDescription>
        </CardHeader>
        {!sent ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" {...register('email')} />
                {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-4">
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? 'Sending...' : 'Send Reset Link'}
              </Button>
              <Link to="/login" className="text-sm text-primary hover:underline">Back to login</Link>
            </CardFooter>
          </form>
        ) : (
          <CardFooter className="flex-col gap-4 pt-0">
            <Link to="/login">
              <Button variant="outline" className="w-full">Back to login</Button>
            </Link>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;

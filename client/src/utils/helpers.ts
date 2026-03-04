import { formatDistanceToNow, format } from 'date-fns';

export const generateId = (): string =>
  Math.random().toString(36).substring(2, 11) + Date.now().toString(36);

export const formatDate = (date: string): string =>
  format(new Date(date), 'MMM dd, yyyy');

export const formatDateTime = (date: string): string =>
  format(new Date(date), 'MMM dd, yyyy HH:mm');

export const formatRelativeTime = (date: string): string =>
  formatDistanceToNow(new Date(date), { addSuffix: true });

export const getPasswordStrength = (password: string): 'weak' | 'medium' | 'strong' => {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (score <= 2) return 'weak';
  if (score <= 3) return 'medium';
  return 'strong';
};

export const maskEmail = (email: string): string => {
  const [user, domain] = email.split('@');
  return `${user[0]}${'*'.repeat(Math.max(user.length - 2, 1))}${user.slice(-1)}@${domain}`;
};

export const getInitials = (name: string): string =>
  name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

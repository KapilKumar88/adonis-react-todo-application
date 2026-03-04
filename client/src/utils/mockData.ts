import { User, Todo, Role, Permission, ActivityLog } from '@/types';

export const permissions: Permission[] = [
  { id: 'p1', name: 'Create Users', resource: 'users', action: 'create' },
  { id: 'p2', name: 'Read Users', resource: 'users', action: 'read' },
  { id: 'p3', name: 'Update Users', resource: 'users', action: 'update' },
  { id: 'p4', name: 'Delete Users', resource: 'users', action: 'delete' },
  { id: 'p5', name: 'Create Todos', resource: 'todos', action: 'create' },
  { id: 'p6', name: 'Read Todos', resource: 'todos', action: 'read' },
  { id: 'p7', name: 'Update Todos', resource: 'todos', action: 'update' },
  { id: 'p8', name: 'Delete Todos', resource: 'todos', action: 'delete' },
  { id: 'p9', name: 'Create Roles', resource: 'roles', action: 'create' },
  { id: 'p10', name: 'Read Roles', resource: 'roles', action: 'read' },
  { id: 'p11', name: 'Update Roles', resource: 'roles', action: 'update' },
  { id: 'p12', name: 'Delete Roles', resource: 'roles', action: 'delete' },
  { id: 'p13', name: 'Manage Roles', resource: 'roles', action: 'manage' },
  { id: 'p14', name: 'Read Logs', resource: 'logs', action: 'read' },
  { id: 'p15', name: 'Manage Settings', resource: 'settings', action: 'manage' },
];

export const roles: Role[] = [
  {
    id: 'r1',
    name: 'Admin',
    description: 'Full access to all resources and settings',
    permissions: permissions,
    createdAt: '2025-01-01T00:00:00Z',
  },
  {
    id: 'r2',
    name: 'Moderator',
    description: 'Can manage users and view logs',
    permissions: permissions.filter(p => ['users', 'todos', 'logs'].includes(p.resource) && p.action !== 'delete'),
    createdAt: '2025-01-15T00:00:00Z',
  },
  {
    id: 'r3',
    name: 'User',
    description: 'Basic access to own todos',
    permissions: permissions.filter(p => p.resource === 'todos'),
    createdAt: '2025-01-01T00:00:00Z',
  },
];

export const users: User[] = [
  {
    id: 'u1',
    name: 'Admin User',
    email: 'admin@todo.com',
    password: 'admin123',
    role: 'admin',
    permissions: permissions,
    status: 'active',
    bio: 'System administrator',
    createdAt: '2025-01-01T00:00:00Z',
    lastLogin: '2026-03-04T10:00:00Z',
  },
  {
    id: 'u2',
    name: 'Alice Johnson',
    email: 'alice@todo.com',
    password: 'password123',
    role: 'user',
    permissions: roles[2].permissions,
    status: 'active',
    bio: 'Product designer who loves checklists',
    createdAt: '2025-02-10T00:00:00Z',
    lastLogin: '2026-03-03T14:30:00Z',
  },
  {
    id: 'u3',
    name: 'Bob Williams',
    email: 'bob@todo.com',
    password: 'password123',
    role: 'moderator',
    permissions: roles[1].permissions,
    status: 'active',
    bio: 'Team lead and moderator',
    createdAt: '2025-03-05T00:00:00Z',
    lastLogin: '2026-03-02T09:15:00Z',
  },
  {
    id: 'u4',
    name: 'Carol Davis',
    email: 'carol@todo.com',
    password: 'password123',
    role: 'user',
    permissions: roles[2].permissions,
    status: 'inactive',
    createdAt: '2025-04-20T00:00:00Z',
    lastLogin: '2026-01-15T11:00:00Z',
  },
  {
    id: 'u5',
    name: 'David Chen',
    email: 'david@todo.com',
    password: 'password123',
    role: 'user',
    permissions: roles[2].permissions,
    status: 'active',
    createdAt: '2025-06-12T00:00:00Z',
    lastLogin: '2026-03-01T16:45:00Z',
  },
  {
    id: 'u6',
    name: 'Eva Martinez',
    email: 'eva@todo.com',
    password: 'password123',
    role: 'user',
    permissions: roles[2].permissions,
    status: 'banned',
    createdAt: '2025-07-01T00:00:00Z',
    lastLogin: '2025-12-20T08:00:00Z',
  },
];

const todoTemplates = [
  { title: 'Review project proposal', description: 'Go through the Q2 project proposal and provide feedback', priority: 'high' as const },
  { title: 'Update documentation', description: 'Update the API documentation with new endpoints', priority: 'medium' as const },
  { title: 'Fix login bug', description: 'Users report intermittent login failures', priority: 'high' as const },
  { title: 'Design new landing page', description: 'Create mockups for the marketing landing page', priority: 'medium' as const },
  { title: 'Write unit tests', description: 'Add tests for the authentication module', priority: 'low' as const },
  { title: 'Optimize database queries', description: 'Improve performance of user search queries', priority: 'high' as const },
  { title: 'Weekly team sync', description: 'Prepare agenda for the weekly standup', priority: 'low' as const },
  { title: 'Deploy staging build', description: 'Push latest changes to staging environment', priority: 'medium' as const },
  { title: 'Code review PR #42', description: 'Review and approve the feature branch', priority: 'medium' as const },
  { title: 'Create onboarding flow', description: 'Build the new user onboarding experience', priority: 'high' as const },
  { title: 'Refactor auth module', description: 'Clean up authentication code structure', priority: 'medium' as const },
  { title: 'Setup CI/CD pipeline', description: 'Configure automated deployment pipeline', priority: 'high' as const },
  { title: 'Write blog post', description: 'Draft article about new features for the blog', priority: 'low' as const },
  { title: 'Update dependencies', description: 'Upgrade npm packages to latest versions', priority: 'low' as const },
  { title: 'Client presentation', description: 'Prepare slides for the client demo on Friday', priority: 'high' as const },
  { title: 'Fix responsive layout', description: 'Mobile view is broken on the dashboard', priority: 'medium' as const },
  { title: 'Add dark mode support', description: 'Implement dark mode toggle across the app', priority: 'medium' as const },
  { title: 'Backup database', description: 'Create manual backup of production database', priority: 'low' as const },
  { title: 'User feedback survey', description: 'Analyze results from the Q1 user survey', priority: 'low' as const },
  { title: 'Security audit', description: 'Run security scan and fix vulnerabilities', priority: 'high' as const },
  { title: 'Plan sprint retrospective', description: 'Prepare topics for the retro meeting', priority: 'medium' as const },
  { title: 'Migrate to TypeScript', description: 'Convert remaining JS files to TypeScript', priority: 'medium' as const },
];

const statuses: Todo['status'][] = ['pending', 'in-progress', 'completed'];
const tagOptions = ['frontend', 'backend', 'design', 'devops', 'docs', 'bug', 'feature', 'urgent'];

export const todos: Todo[] = todoTemplates.map((t, i) => ({
  id: `t${i + 1}`,
  userId: users[1 + (i % 5)].id, // distribute across non-admin users
  title: t.title,
  description: t.description,
  status: statuses[i % 3],
  priority: t.priority,
  dueDate: new Date(2026, 2, 5 + i).toISOString(),
  tags: [tagOptions[i % tagOptions.length], tagOptions[(i + 3) % tagOptions.length]],
  createdAt: new Date(2026, 1, 1 + i).toISOString(),
  updatedAt: new Date(2026, 2, 1 + i).toISOString(),
}));

const logActions = [
  'Logged in', 'Logged out', 'Created todo', 'Updated todo', 'Deleted todo',
  'Updated profile', 'Changed password', 'Created user', 'Deleted user',
  'Updated role', 'Viewed logs', 'Exported data', 'Changed settings',
  'Failed login attempt', 'Toggled user status', 'Assigned role',
];
const logResources = ['auth', 'todos', 'users', 'roles', 'settings', 'logs'];
const logStatuses: ActivityLog['status'][] = ['success', 'success', 'success', 'success', 'failed', 'warning'];
const ips = ['192.168.1.1', '10.0.0.45', '172.16.0.12', '192.168.1.100', '10.0.0.200', '203.0.113.50'];

export const activityLogs: ActivityLog[] = Array.from({ length: 60 }, (_, i) => {
  const user = users[i % users.length];
  const action = logActions[i % logActions.length];
  return {
    id: `log${i + 1}`,
    userId: user.id,
    userName: user.name,
    action,
    resource: logResources[i % logResources.length],
    details: `${user.name} ${action.toLowerCase()} — ${['item #' + (i + 1), 'session refreshed', 'bulk operation', 'manual trigger'][i % 4]}`,
    ipAddress: ips[i % ips.length],
    timestamp: new Date(2026, 2, 4, 0, 0, 0, 0).getTime() - i * 3600000 > 0
      ? new Date(new Date(2026, 2, 4).getTime() - i * 3600000).toISOString()
      : new Date(2026, 1, 28).toISOString(),
    status: logStatuses[i % logStatuses.length],
  };
});

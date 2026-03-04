import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageHeader from '@/components/common/PageHeader';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { roles as mockRoles, permissions as allPermissions } from '@/utils/mockData';
import { Role } from '@/types';
import { toast } from '@/hooks/use-toast';

const resources = [...new Set(allPermissions.map(p => p.resource))];
const actions = [...new Set(allPermissions.map(p => p.action))];

const PermissionsPage: React.FC = () => {
  const [roles, setRoles] = useLocalStorage<Role[]>('todo-roles', mockRoles);

  const hasPerm = (role: Role, resource: string, action: string) =>
    role.permissions.some(p => p.resource === resource && p.action === action);

  const togglePerm = (roleId: string, resource: string, action: string) => {
    const perm = allPermissions.find(p => p.resource === resource && p.action === action);
    if (!perm) return;
    setRoles(prev => prev.map(r => {
      if (r.id !== roleId) return r;
      const has = r.permissions.some(p => p.id === perm.id);
      return {
        ...r,
        permissions: has ? r.permissions.filter(p => p.id !== perm.id) : [...r.permissions, perm],
      };
    }));
    toast({ title: 'Permission updated' });
  };

  return (
    <div>
      <PageHeader title="Permissions Management" subtitle="Control access across roles" />

      <Tabs defaultValue="matrix">
        <TabsList className="mb-4">
          <TabsTrigger value="matrix">Matrix View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>

        <TabsContent value="matrix">
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="sticky left-0 bg-background z-10">Resource / Action</TableHead>
                  {roles.map(role => (
                    <TableHead key={role.id} className="text-center min-w-[100px]">{role.name}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {resources.map(resource =>
                  actions.filter(action => allPermissions.some(p => p.resource === resource && p.action === action)).map(action => (
                    <TableRow key={`${resource}-${action}`}>
                      <TableCell className="sticky left-0 bg-background z-10">
                        <span className="capitalize font-medium">{resource}</span>
                        <span className="text-muted-foreground"> / {action}</span>
                      </TableCell>
                      {roles.map(role => (
                        <TableCell key={role.id} className="text-center">
                          <Switch
                            checked={hasPerm(role, resource, action)}
                            onCheckedChange={() => togglePerm(role.id, resource, action)}
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="list">
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Permission</TableHead>
                  <TableHead>Resource</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Assigned To</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allPermissions.map(perm => (
                  <TableRow key={perm.id}>
                    <TableCell className="font-medium">{perm.name}</TableCell>
                    <TableCell className="capitalize">{perm.resource}</TableCell>
                    <TableCell className="capitalize">{perm.action}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {roles.filter(r => r.permissions.some(p => p.id === perm.id)).map(r => (
                          <Badge key={r.id} variant="secondary" className="text-xs">{r.name}</Badge>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PermissionsPage;

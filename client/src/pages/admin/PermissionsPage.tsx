import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageHeader from '@/components/common/PageHeader';
import { useQuery } from '@tanstack/react-query';
import { adminPermissionService } from '@/services/admin/permission.service';
import ErrorState from '@/components/common/ErrorState';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import MatrixView from '@/components/admin/permission/tabView/MatrixView';
import ListView from '@/components/admin/permission/tabView/ListView';
import { adminRoleService } from '@/services/admin/role.service';

const PermissionsPage: React.FC = () => {

  const { isPending, isError, data, error, refetch } = useQuery({
    queryKey: ['permissions'],
    queryFn: () => adminPermissionService.list(),
  });

  const { isPending: isRolesPending, isError: isRolesError, data: rolesData, error: rolesError, refetch: refetchRoles } = useQuery({
    queryKey: ['roles'],
    queryFn: () => adminRoleService.list(),
  })

  if (isPending) {
    return <LoadingSpinner />
  }

  if (isError) {
    return <ErrorState message={error?.message} onRetry={refetch} />
  }

  return (
    <div>
      <PageHeader title="Permissions Management" subtitle="Control access across roles" />

      <Tabs defaultValue="matrix">
        <TabsList className="mb-4">
          <TabsTrigger value="matrix">Matrix View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>

        <TabsContent value="matrix">
          <MatrixView data={data?.data} roles={rolesData?.data} />
        </TabsContent>

        <TabsContent value="list">
          <ListView data={data?.data} roles={rolesData?.data} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PermissionsPage;

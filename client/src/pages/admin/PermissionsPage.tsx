import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageHeader from '@/components/common/PageHeader';
import ErrorState from '@/components/common/ErrorState';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import MatrixView from '@/components/admin/permission/tabView/MatrixView';
import ListView from '@/components/admin/permission/tabView/ListView';
import { useGetPermissionsList } from '@/hooks/usePermission';
import { useRoles } from '@/hooks/useRole';

const PermissionsPage: React.FC = () => {

  const { isPending, isError, data, error, refetch } = useGetPermissionsList();

  const { isPending: isRolesPending, isError: isRolesError, data: rolesData, error: rolesError, refetch: refetchRoles } = useRoles();

  if (isPending || isRolesPending) {
    return <LoadingSpinner />
  }

  if (isError || isRolesError) {
    return <ErrorState message={error?.message || rolesError?.message} onRetry={() => { refetch(); refetchRoles(); }} />
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
          <ListView data={data?.data} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PermissionsPage;

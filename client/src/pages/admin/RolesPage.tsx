import React, { useState } from 'react';
import { Plus, KeyRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageHeader from '@/components/common/PageHeader';
import EmptyState from '@/components/common/EmptyState';
import RoleCard from '@/components/admin/role/RoleCard';
import UpsertRoleModal from '@/components/admin/role/UpsertRoleModal';
import ErrorState from '@/components/common/ErrorState';
import { useRoles } from '@/hooks/useRole';
import { AdminSideRoleType } from '@/types/role.types';

const RolesPage: React.FC = () => {
  const [openUpsertModal, setOpenUpsertModal] = useState(false);
  const [roleDetails, setRoleDetails] = useState<AdminSideRoleType | null>(null); // For edit functionality, if needed

  const { isPending, isError, data, error, refetch } = useRoles();

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <ErrorState message={error?.message} onRetry={refetch} />
  }

  const apiRoles = data?.data || [];

  return (
    <div>
      <PageHeader
        title="Roles Management"
        subtitle={`${data?.metaData?.total || 0} roles`}
        actions={
          <Button onClick={() => {
            setRoleDetails(null);
            setOpenUpsertModal(true);
          }}>
            <Plus className="h-4 w-4 mr-1" /> Add Role
          </Button>
        }
      />

      {apiRoles.length === 0 ? (
        <EmptyState
          icon={KeyRound}
          title="No roles"
          description="Create your first role."
          actionLabel="Add Role"
          onAction={() => {
            setRoleDetails(null);
            setOpenUpsertModal(true)
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {apiRoles.map(role => (
            <RoleCard key={role.id}
              role={role}
              onEdit={() => {
                setRoleDetails(role);
                setOpenUpsertModal(true);
              }}
            />
          ))}
        </div>
      )}

      <UpsertRoleModal
        modalOpen={openUpsertModal}
        setModalOpen={setOpenUpsertModal}
        editRole={roleDetails}
        isEdit={roleDetails !== null}
      />
    </div>
  );
};

export default RolesPage;

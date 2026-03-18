import React from 'react';
import PageHeader from '@/components/common/PageHeader';
import { userProfileKeys, userProfileService } from '@/services/user/profile.service';
import { useQuery } from '@tanstack/react-query';
import PersonalInfo from '@/components/user/profile/PersonalInfo';
import ChangePassword from '@/components/user/profile/ChangePassword';
import AccountStats from '@/components/user/profile/AccountStats';
import ErrorState from '@/components/common/ErrorState';

const ProfilePage: React.FC = () => {
  const { isPending, isError, data: currentUser, error, refetch } = useQuery({
    queryKey: userProfileKeys.profile,
    queryFn: () => userProfileService.getUserProfile(),
  })

  if (isPending) return null;
  if (isError || !currentUser) return <ErrorState message={error?.message ?? 'Failed to load profile.'} onRetry={refetch} />;

  return (
    <div>
      <PageHeader title="Profile" subtitle="Manage your account" />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <PersonalInfo userInfo={currentUser?.data} />
          {/* <ChangePassword /> */}
        </div>
        <div>
          {/* <AccountStats userInfo={currentUser?.data} /> */}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

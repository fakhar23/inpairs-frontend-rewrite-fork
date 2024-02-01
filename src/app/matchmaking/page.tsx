'use client';
import React from 'react';
import UserProfileLayout from '@/layouts/UserProfileLayout';
import RankingTable from './RankingTable';
import useVerifyPermission from '@/hooks/useVerifyPermission';
import { Loading } from '@/components';
import './style.css';

const MatchMakingPage = () => {
  const { isLoading } = useVerifyPermission(['ADMIN', 'MATCHMAKER']);

  return (
    <UserProfileLayout>
      {isLoading && (
        <div className="absolute z-20 top-0 bottom-0 right-0 left-0 flex items-center justify-center bg-black/10">
          <Loading />
        </div>
      )}
      <div className="wrapper flex justify-center items-center">
        <RankingTable />
      </div>
    </UserProfileLayout>
  );
};

export default MatchMakingPage;

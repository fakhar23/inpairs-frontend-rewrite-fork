import React, { Suspense } from "react";
import UserProfileLayout from "@/layouts/UserProfileLayout";
import RankingTable from "./RankingTable";

const MatchMakingPage = () => {
  return (
    <UserProfileLayout>
      <div className="wrapper flex justify-center items-center">
        <Suspense>
          <RankingTable />
        </Suspense>
      </div>
    </UserProfileLayout>
  );
};

export default MatchMakingPage;

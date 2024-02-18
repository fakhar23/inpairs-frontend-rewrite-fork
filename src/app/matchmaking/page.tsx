import React, { Suspense } from "react";
import UserProfileLayout from "@/layouts/UserProfileLayout";
import ScoringTable from "./ScoringTable";

const MatchMakingPage = () => {
  return (
    <UserProfileLayout>
      <div className="wrapper flex justify-center items-center">
        <Suspense>
          <ScoringTable />
        </Suspense>
      </div>
    </UserProfileLayout>
  );
};

export default MatchMakingPage;

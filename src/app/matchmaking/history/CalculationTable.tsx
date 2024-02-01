"use client";
import React, { useMemo } from "react";
import Table from "@/components/Table";
import { useGetMatchTracking } from "@/api/matchmaking";
import { Loading, LoadingCircle } from "@/components";
import { useAuthContext } from "@/hooks/useAuthContext";

const getColumn = (user: any) => {
  return [
    {
      header: () => "",
      accessorKey: "title",
      cell: ({ getValue }: any) => {
        return getValue() === user?.email ? "Me" : getValue();
      },
    },
    {
      header: () => "Lifetime Matches",
      accessorKey: "total",
    },
    {
      header: () => "# of Yes",
      accessorKey: "yes",
    },
    {
      header: () => "# of No",
      accessorKey: "no",
    },
    {
      header: () => "Auto Rejected",
      accessorKey: "autoRejected",
    },
    {
      header: () => "# of Connected",
      accessorKey: "connected",
    },
  ];
};

export default function CalculationTable() {
  const { data: matchTracking, ...resGetmatchTracking } = useGetMatchTracking({
    queryParams: { select: "calculations" },
  });
  const { data: user, ...resUser } = useAuthContext();

  const columns = useMemo(() => getColumn(user), [user]);

  const loading = resGetmatchTracking.isLoading || resUser.isLoading;

  return (
    <div className="mb-2">
      {loading && <LoadingCircle />}
      <h1 className="text-center text-purple-900 text-2xl font-bold mb-3 mt-5">
        {user?.email} # of Months
      </h1>
      <Table
        columns={columns}
        data={
          matchTracking?.calculations?.length ? matchTracking?.calculations : []
        }
      />
    </div>
  );
}

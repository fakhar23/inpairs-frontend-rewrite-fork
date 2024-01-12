"use client";
import React from "react";

import Table from "@/components/Table";

const getColumn = (user: any) => {
  return [
    {
      header: () => "",
      accessorKey: "title",
      cell: ({ getValue }: any) => {
        return getValue() === user?.username ? "Me" : getValue();
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

const tempData = {
  calculations: [
    {
      title: "Hhuk",
      total: 0,
      yes: 0,
      no: 0,
      autoRejected: 0,
      connected: 0,
    },
    {
      title: "AVERAGE",
      total: 0,
      yes: 0,
      no: 0,
      autoRejected: 0,
      connected: 0,
    },
    {
      title: "TOTAL",
      total: 0,
      yes: 0,
      no: 0,
      autoRejected: 0,
      connected: 0,
    },
  ],
  columns: [
    {
      accessorKey: "title",
    },
    {
      accessorKey: "total",
    },
    {
      accessorKey: "yes",
    },
    {
      accessorKey: "no",
    },
    {
      accessorKey: "autoRejected",
    },
    {
      accessorKey: "connected",
    },
  ],
};

export default function CalculationTable() {
  const user = {
    username: "Muhammad Fakhar",
  };

  return (
    <div className="mb-2">
      <h1 className="text-center text-purple-900 text-2xl font-bold mb-3 mt-5">
        {user?.username} # of Months
      </h1>
      {/* <Table columns={getColumn(user)} data={data?.calculations || []} /> */}
      <Table columns={getColumn(user)} data={tempData.calculations} />
    </div>
  );
}

"use client";
import React from "react";

import Table from "@/components/Table";

const getColumn = (user: any) => {
  return [
    {
      header: () => "",
      accessorKey: "title",
      cell: ({ getValue }: any) => {
        //getValue is helper function from react-table,used to customize how the data for a cell is displayed
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
      title: "User1",
      total: 120,
      yes: 45,
      no: 30,
      autoRejected: 10,
      connected: 35,
    },
    {
      title: "User2",
      total: 200,
      yes: 100,
      no: 50,
      autoRejected: 20,
      connected: 30,
    },
    {
      title: "User3",
      total: 150,
      yes: 60,
      no: 40,
      autoRejected: 15,
      connected: 35,
    },
    {
      title: "AVERAGE",
      total: Math.round((120 + 200 + 150) / 3),
      yes: Math.round((45 + 100 + 60) / 3),
      no: Math.round((30 + 50 + 40) / 3),
      autoRejected: Math.round((10 + 20 + 15) / 3),
      connected: Math.round((35 + 30 + 35) / 3),
    },
    {
      title: "TOTAL",
      total: 120 + 200 + 150,
      yes: 45 + 100 + 60,
      no: 30 + 50 + 40,
      autoRejected: 10 + 20 + 15,
      connected: 35 + 30 + 35,
    },
  ],
};

export default function CalculationTable() {
  const user = {
    username: "Muhammad Fakhar",
  };

  return (
    <div className="mb-2">
      <h1 className="text-center text-purple900 text-2xl font-bold mb-3 mt-5">
        {user?.username} # of Months
      </h1>
      <Table columns={getColumn(user)} data={tempData.calculations} />
    </div>
  );
}

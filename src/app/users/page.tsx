"use client";
import debounce from "lodash/debounce";
import { IoCheckmark, IoClose } from "react-icons/io5";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { UserProfileLayout } from "@/layouts";

import { Button } from "@/components";
import { user, userListData } from "./data";
import CustomInput from "@/components/CustomInput";
import Table from "@/components/Table";
import { SortingState } from "@tanstack/react-table";
import ReactPaginate from "react-paginate";
import "../matchmaking/style.css";

const User = () => {
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 10;
  const pageCount = Math.ceil(userListData.data.length / itemsPerPage);

  const { data: userList, meta } = userListData || {};
  const isAdminOnly = ["ADMIN"].includes(user?.role || "");

  const changePage = ({ selected }: { selected: number }) => {
    setPageNumber(selected);
  };

  const handleAction = async (e: any, data: any) => {
    try {
      e.preventDefault();
      let result = confirm(
        `Are you sure you want to ${
          data?.disabled ? "ACTIVATE" : "DEACTIVATE"
        } this user including stripe subscription?`
      );
      if (result) {
        // TODO: call api to update user status
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error.response?.data);
      }
    }
  };

  const columns = [
    {
      header: "Name",
      accessorKey: "",
      cell: ({ row }: any) => {
        const firstName = row?.original?.first_name || "";
        const lastName = row?.original?.last_name || "";

        const fullName =
          firstName && lastName ? `${firstName} ${lastName}` : "";
        return <span>{fullName}</span>;
      },
    },
    {
      header: () => "Email",
      accessorKey: "email",
    },
    {
      header: () => "Gender",
      accessorKey: "gender",
    },
    {
      header: () => "Role",
      accessorKey: "role",
    },
    {
      header: "Active",
      accessorKey: "disabled",
      cell: ({ row }: any) => {
        const icon = !row?.original?.disabled ? (
          <IoCheckmark className="text-green-500 text-xl" />
        ) : (
          <IoClose className="text-red-500 text-xl" />
        );
        return <div className="pl-4">{icon}</div>;
      },
    },
    {
      header: "Action",
      accessorKey: "",
      cell: ({ row }: any) => {
        return (
          <Button
            onClick={(e: any) => handleAction(e, row?.original)}
            className={`!rounded-md ${
              row?.original?.disabled ? "!bg-green-500" : ""
            }`}
          >
            {row?.original?.disabled ? "Activate" : "Deactivate"}
          </Button>
        );
      },
    },
  ];

  return (
    <UserProfileLayout>
      <div className="max-w-7xl mx-auto">
        <div>
          <div className="flex justify-between items-center">
            <h1 className="my-10 text-2xl font-medium text-title">User Page</h1>
          </div>
          <CustomInput
            id="search"
            inputClassName="bg-neutral-100 w-full"
            className="w-full my-5"
            onChange={debounce(
              (e: React.ChangeEvent<HTMLInputElement>) =>
                setSearch(e.target.value),
              700
            )}
            label="Search"
          />

          <Table
            columns={columns}
            data={userList}
            sorting={sorting}
            setSorting={setSorting}
          />

          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"pagination"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            activeClassName={"active"}
          />
        </div>
      </div>
    </UserProfileLayout>
  );
};

export default User;

"use client";
import React, { ChangeEvent, useMemo, useState } from "react";

import { SortingState } from "@tanstack/react-table";
import debounce from "lodash/debounce";
import { IoChatbox } from "react-icons/io5";

import CustomInput from "@/components/CustomInput";
import ExpandableText from "@/components/ExpandableText";
import Table from "@/components/Table";
import UserProfileLayout from "@/layouts/UserProfileLayout";

import CalculationTable from "./CalculationTable";
import { matchesData } from "./matchesData";
import { Pencil } from "./pencil";
import CustomModal from "@/components/CustomModal";
import RejectionReasonsModal from "./RejectionReasonsModal";
import UserLink from "./UserLink";
import Note from "./Note";

const getMatchStatus = (status: string, reason: string) => {
  if (status == "ACCEPTED") {
    return <span className="text-green-500">{status}</span>;
  } else if (status == "REJECTED") {
    return (
      <>
        <span className="text-red mr-2">{status}</span>because &#8220;
        {reason}&#8221;
      </>
    );
  } else {
    return "";
  }
};

const MatchmakingHistory = () => {
  const [showReasons, setshowReasons] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [matchToEdit, setMatchToEdit] = useState<any>(null);

  //ColumnSort type contains sorting info about 1 column {columnId, desc}, SortingState is ColumnSort[] containt sorting table of entire table.
  //We aren't changing them explicity here but if you need more info go to docs or Sorting.d.ts file.
  const [sorting, setSorting] = useState<SortingState>([]);

  const { data: matches, meta } = matchesData || {};

  const columns = useMemo(
    () => [
      {
        header: () => "User 1",
        accessorKey: "user_one",
        cell: ({ row, cell }: any) => {
          const user = row?.original?.user_one;
          return <UserLink user={user} />;
        },
      },
      {
        header: () => "Status",
        accessorKey: "user_one_response",
        cell: ({ row }: any) => {
          return getMatchStatus(
            row?.original?.user_one_match?.user_one_response,
            row?.original?.user_one_match?.user_one_response_message
          );
        },
      },
      {
        header: () => "User 2",
        accessorKey: "user_two",
        cell: ({ row, cell }: any) => {
          const user = row?.original?.user_two;
          return <UserLink user={user} />;
        },
      },
      {
        header: () => "Status",
        accessorKey: "user_two_response",
        cell: ({ row }: any) => {
          return getMatchStatus(
            row?.original?.user_one_match?.user_two_response,
            row?.original?.user_one_match?.user_two_response_message
          );
        },
      },
      {
        header: () => "Notes",
        accessorKey: "notes",
        cell: ({ row }: any) => {
          const { note, read } = row?.original || {};

          return note ? (
            <div className="w-auto">
              <ExpandableText text={note} maxChar={50} />
              <button
                title={read ? "already read" : `Edit`}
                disabled={read}
                className="flex justify-end w-full disabled:grayscale group "
              >
                <Pencil
                  onClick={() => setMatchToEdit(row.original)}
                  className=" hover:opacity-75 zoom-scale-125 cursor-pointer w-4 h-4 group-disabled:cursor-not-allowed"
                />
              </button>
            </div>
          ) : (
            <button
              title="Add"
              onClick={() => setMatchToEdit(row.original)}
              className="flex justify-end w-full"
            >
              <IoChatbox className="text-purple-900 hover:opacity-75 zoom-scale-125 cursor-pointer   " />
            </button>
          );
        },
      },
    ],
    []
  );

  const data = matches?.length
    ? matches.map((row: any) => {
        return {
          id: row.id,
          note: row.notes,
          read: row.u1_match_viewed && row.u2_match_viewed,
          user_one: row.UserOne,
          user_one_match: row.Match,
          user_two: row.UserTwo,
          user_two_match: row.Match,
        };
      })
    : [];

  return (
    <UserProfileLayout>
      <div className="max-w-7xl mx-auto">
        <CalculationTable />
        <div className="flex justify-between items-center">
          <h1 className="my-10 text-2xl font-medium text-purple-900">
            Matchmaking History
          </h1>
          <button
            onClick={() => setshowReasons(true)}
            className="bg-red-500 text-white px-[2rem] py-[0.3rem] md:px-[5rem] md:py-[0.4rem] md:text-regular rounded-3xl text-[1.2rem] shadow-xl hover:bg-lightRed disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            Rejection Reasons
          </button>
        </div>
        <CustomInput
          id="search ID"
          inputClassName="bg-neutral-100 w-full"
          className="w-full my-5"
          onChange={debounce(
            (e: ChangeEvent<HTMLInputElement>) =>
              setSearchText(e?.target.value),
            1000
          )}
          label="Search label"
        />
        <Table
          columns={columns}
          data={data}
          sorting={sorting}
          setSorting={setSorting}
        />
        <CustomModal
          title="List of Rejection Reasons"
          titleClassName="!text-2xl text-purple-900"
          className=""
          show={showReasons}
          onClose={() => setshowReasons(false)}
        >
          <RejectionReasonsModal />
        </CustomModal>
        <CustomModal show={!!matchToEdit} onClose={() => setMatchToEdit(null)}>
          <Note matchToEdit={matchToEdit} setMatchToEdit={setMatchToEdit} />
        </CustomModal>
      </div>
    </UserProfileLayout>
  );
};

export default MatchmakingHistory;

"use client";
import React, { ChangeEvent, useCallback, useMemo, useState } from "react";
import ReactPaginate from "react-paginate";
import { SortingState } from "@tanstack/react-table";
import debounce from "lodash/debounce";
import { IoChatbox } from "react-icons/io5";
import CustomInput from "@/components/CustomInput";
import ExpandableText from "@/components/ExpandableText";
import Table from "@/components/Table";
import UserProfileLayout from "@/layouts/UserProfileLayout";
import CalculationTable from "./CalculationTable";
import CustomModal from "@/components/CustomModal";
import RejectionReasonsModal from "./RejectionReasonsModal";
import Note from "./Note";
import { useListMatchmaking } from "@/api/matchmaking";
import { queryParams } from "@/api/types";
import { Button, Loading } from "@/components";
import { PencilIcon } from "@/Icons/PencilIcon";
import UserLink from "@/components/UserLink";
import "../style.css";
import useVerifyPermission from "@/hooks/useVerifyPermission";

export default function MatchmakingHistory() {
  const { isLoading } = useVerifyPermission(["ADMIN", "MATCHMAKER"]);
  const [showReasons, setshowReasons] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [matchToEdit, setMatchToEdit] = useState<any>(null);
  const [page, setPage] = useState({ current: 1, take: 10 });

  const queryParams: queryParams = useMemo(() => {
    const qp: queryParams = {
      page: page.current,
      take: page.take,
    };
    if (searchText) {
      qp.filter = {
        search: searchText,
        search_keys:
          "UserOne.first_name,UserOne.last_name,UserTwo.first_name,UserTwo.last_name",
      };
    }
    return qp;
  }, [page, searchText]);

  const { data: matchmakingList, ...restMatchmakingList } = useListMatchmaking({
    queryParams,
    skip: isLoading,
  });
  const { data: matches, meta } = matchmakingList || {};

  //ColumnSort type contains sorting info about 1 column {columnId, desc}, SortingState is ColumnSort[] containt sorting table of entire table.
  //We aren't changing them explicity here but if you need more info go to docs or Sorting.d.ts file.

  const columns = useMemo(
    () => [
      {
        header: () => "User 1",
        accessorKey: "user_one_name",
        cell: ({ row }: any) => {
          return <UserLink user={row.original.UserOne} />;
        },
      },
      {
        header: () => "Status",
        accessorKey: "male_response",
        cell: ({ row }: any) => {
          return getMatchStatus(
            row?.original?.male_response,
            row?.original?.male_response_message,
          );
        },
      },
      {
        header: () => "User 2",
        accessorKey: "user_two_name",
        cell: ({ row }: any) => {
          return <UserLink user={row.original.UserTwo} />;
        },
      },
      {
        header: () => "Status",
        accessorKey: "female_response",
        cell: ({ row }: any) => {
          return getMatchStatus(
            row?.original?.female_response,
            row?.original?.female_response_message,
          );
        },
      },
      {
        header: () => "Notes",
        accessorKey: "matchmaker_notes",
        cell: ({ row }: any) => {
          const {
            matchmaker_notes,
            match_viewed_by_female,
            match_viewed_by_male,
          } = row?.original || {};
          const read = match_viewed_by_female || match_viewed_by_male;

          return matchmaker_notes ? (
            <div className="w-auto flex items-center">
              <ExpandableText text={matchmaker_notes} maxChar={50} />
              <button
                title={read ? "already read" : `Edit`}
                disabled={read}
                className="flex justify-end w-full disabled:grayscale group "
              >
                <PencilIcon
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
              <IoChatbox className="text-secondary-600 hover:opacity-75 zoom-scale-125 cursor-pointer   " />
            </button>
          );
        },
      },
    ],
    [],
  );

  const handlePageChange = useCallback(
    (value: number, key: string) => {
      setPage({ ...page, [key]: value });
    },
    [page],
  );

  const data = matches?.length
    ? matches.map((v: any, i: number) => ({
        ...v,
        i,
        user_one_name: `${v.UserOne.first_name} ${v.UserOne.last_name}`,
        user_two_name: `${v.UserTwo.first_name} ${v.UserTwo.last_name}`,
      }))
    : [];
  const loading = restMatchmakingList.isLoading;

  return (
    <UserProfileLayout>
      <div className="wrapper">
        {loading && (
          <div className="absolute z-20 top-0 bottom-0 right-0 left-0 flex items-center justify-center bg-black/10">
            <Loading />
          </div>
        )}
        <CalculationTable />
        <div className="flex justify-between items-center">
          <h1 className="my-10 text-2xl font-medium text-secondary-600">
            Matchmaking History
          </h1>
          <Button onClick={() => setshowReasons(true)}>
            Rejection Reasons
          </Button>
        </div>
        <CustomInput
          id="search ID"
          inputClassName="bg-neutral-100 w-full"
          className="w-full my-5"
          onChange={debounce(
            (e: ChangeEvent<HTMLInputElement>) =>
              setSearchText(e?.target.value),
            700,
          )}
          label="Search user"
        />
        <Table
          columns={columns}
          data={data}
          sorting={sorting}
          setSorting={setSorting}
        />

        {meta?.count && (
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            pageCount={Math.ceil(meta?.count / page.take)}
            onPageChange={({ selected }) =>
              handlePageChange(selected + 1, "current")
            }
            containerClassName={"pagination"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            activeClassName={"active"}
          />
        )}
        <CustomModal
          title="List of Rejection Reasons"
          titleClassName="!text-2xl text-secondary-600"
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
}

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

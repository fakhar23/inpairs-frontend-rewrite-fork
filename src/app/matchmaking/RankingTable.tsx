"use client";
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Link from "next/link";
import ReactPaginate from "react-paginate";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { Button, Loading } from "@/components";
import CustomInput from "@/components/CustomInput";
import { debounce } from "lodash";
import Table from "@/components/Table";
import {
  ColumnDef,
  SortingState,
  createColumnHelper,
} from "@tanstack/react-table";
import Select, { SingleValue } from "react-select";
import UserLink from "@/components/UserLink";
import { qsToQueryParams, queryParamsToQs } from "@/api/helpers";
import { QueryParams, MetaResponse, FilterQuery } from "@/api/types";
import useVerifyPermission from "@/hooks/useVerifyPermission";
import { ENDPOINTS, getMatchScoring } from "@/api";

type RankOptionItem = { value: string; label: string };
export type userScoring = {
  i: number;
  id: string;
  name: string;
  ranked: "Yes" | "No";
  potential_matches: number;
};

type ScoringResult = {
  data: ScoringItemResult[];
  meta: MetaResponse;
};

type ScoringItemResult = {
  id: string;
  first_name: string;
  last_name: string;
  ranked: boolean | null;
  potential_matches: number;
};

export const rankOptions: RankOptionItem[] = [
  { value: "", label: "All" },
  { value: "true", label: "Ranked" },
  { value: "false", label: "Not Ranked" },
];

const useGetScoring = (queryString: string) => {
  return useQuery({
    queryKey: [ENDPOINTS.matchScoring, queryString],
    queryFn: async (): Promise<ScoringResult> => {
      return await getMatchScoring(queryString);
    },
    placeholderData: (previousData) => previousData,
  });
};

export default function RankingTable() {
  const { isLoading: checkPermission } = useVerifyPermission([
    "ADMIN",
    "MATCHMAKER",
  ]);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [qp, setQp] = useState<QueryParams>({
    page: 1,
    take: 20,
    filter: {},
  });

  useEffect(() => {
    const newQp: QueryParams = { ...qp };
    const qs = searchParams?.toString();
    const urlQp: any = qsToQueryParams(qs);
    if (urlQp.page) newQp.page = parseInt(urlQp.page);
    if (urlQp.take) newQp.take = parseInt(urlQp.take);
    if (urlQp.filter) newQp.filter = urlQp.filter;
    setQp(newQp);
  }, [searchParams]);

  const queryString = queryParamsToQs(qp);
  const { data: scoringList, isLoading: fetchLoading } =
    useGetScoring(queryString);
  const { data: userScoring, meta } = scoringList || {};

  const handlePageChange = (selected: number) => {
    const newQp = { ...qp };
    newQp.page = selected + 1;
    const newQs = queryParamsToQs(newQp);
    router.push(`${pathname}${newQs}`);
  };

  const handleFilterChange = useCallback(
    (key: string, value: string) => {
      const newQp: any = { ...qp };
      if (!!value) {
        newQp.filter[key] = value;
        if (key === "search") {
          newQp.filter.search_keys = "first_name,last_name";
        }
      } else {
        delete newQp.filter[key];
        if (key === "search") {
          delete newQp.filter.search_keys;
        }
      }
      const newQs = queryParamsToQs(newQp);
      router.push(`${pathname}${newQs}`);
    },
    [qp],
  );

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.info("User id copied");
  };

  const columns = useMemo<ColumnDef<userScoring, any>[]>(() => {
    const col = createColumnHelper<userScoring>();
    return [
      col.accessor("i", {
        id: "NO",
        header: "#",
        cell: ({ row }) => {
          const increment = ((qp?.page || 1) - 1) * (qp?.take || 20);
          return <span>{row.index + increment + 1}</span>;
        },
      }),
      col.accessor("id", {
        id: "ID",
        header: "ID",
        cell: ({ row }) => {
          return (
            <span
              className="cursor-pointer active:text-primary"
              onClick={() => copyToClipboard(row.original.id)}
            >
              {row.original.id.slice(-5)}
            </span>
          );
        },
      }),
      col.accessor("name", {
        id: "NAME",
        header: "NAME",
        cell: ({ row }) => <UserLink user={row.original} />,
      }),
      col.accessor("ranked", {
        id: "RANKING",
        header: () => {
          return (
            <div
              onClick={(e) => e.preventDefault()}
              className="w-full px-6 py-3 flex items-center justify-center gap-3"
            >
              <div>Ranking</div>
              <Select
                id="ranked"
                value={
                  qp.filter && qp.filter?.ranked
                    ? rankOptions.find((v) => v.value == qp.filter?.ranked)
                    : rankOptions[0]
                }
                options={rankOptions}
                onChange={(v: SingleValue<RankOptionItem>) => {
                  handleFilterChange("ranked", v?.value || "");
                }}
              />
            </div>
          );
        },
        cell: ({ row }) => (
          <div className="flex justify-center">{row.original?.ranked}</div>
        ),
      }),

      col.accessor("potential_matches", {
        id: "POTENTIAL MATCHES",
        header: "POTENTIAL MATCHES",
      }),
      col.display({
        id: "ACTION",
        header: "",
        cell: ({ row }) => (
          <Link
            href={{
              pathname: `/ranking/${row.original.id}`,
            }}
          >
            <button className="bg-red-500 hover:bg-red-700 ml-3 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Rank
            </button>
          </Link>
        ),
      }),
    ];
  }, [qp]);

  const data = useMemo<userScoring[]>(
    () =>
      userScoring?.length
        ? userScoring.map((v, i: number) => ({
            ...v,
            i: i + 1,
            name: `${v.first_name} ${v.last_name}`,
            ranked: v.ranked ? "Yes" : "No",
            potential_matches: v.potential_matches,
          }))
        : [],
    [userScoring],
  );
  const initialPage = (qp.page || 1) - 1;

  return (
    <div className="w-full">
      {(fetchLoading || checkPermission) && (
        <div className="absolute z-20 top-0 bottom-0 right-0 left-0 flex items-center justify-center bg-black/10">
          <Loading />
        </div>
      )}
      <div className="relative overflow-x-auto mt-5">
        <div className="flex justify-between">
          <div className="text-2xl font-medium mb-3 text-red">
            Total: {meta?.count}
          </div>
          <Link href="/matchmaking/history">
            <Button>History</Button>
          </Link>
        </div>
        <CustomInput
          id="search ID"
          inputClassName="bg-neutral-100 w-full"
          className="w-full my-5"
          onChange={debounce(
            (e: ChangeEvent<HTMLInputElement>) =>
              handleFilterChange("search", e.target.value),
            700,
          )}
          label="Search user"
        />
        <Table
          className="min-h-60"
          columns={columns}
          data={data}
          sorting={sorting}
          setSorting={setSorting}
        />

        {!!meta?.pageCount ? (
          <ReactPaginate
            initialPage={initialPage}
            previousLabel={"<"}
            nextLabel={">"}
            pageCount={meta.pageCount}
            onClick={({ nextSelectedPage }) => {
              handlePageChange(nextSelectedPage || 0);
            }}
            containerClassName={"pagination"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            activeClassName={"active"}
          />
        ) : null}
      </div>
    </div>
  );
}

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
import { filterQuery, metaResponse, queryParams } from "@/api/types";
import useVerifyPermission from "@/hooks/useVerifyPermission";
import { ENDPOINTS, getMatchScoring } from "@/api";

type rankOptionItem = { value: string; label: string };
export type userScoring = {
  i: number;
  id: string;
  name: string;
  ranked: "Yes" | "No";
  potential_matches: number;
};

type ScoringResult = {
  data: ScoringItemResult[];
  meta: metaResponse;
};

type ScoringItemResult = {
  id: string;
  first_name: string;
  last_name: string;
  ranked: boolean | null;
  potential_matches: number;
};

export const rankOptions: rankOptionItem[] = [
  { value: "", label: "All" },
  { value: "true", label: "Ranked" },
  { value: "false", label: "Not Ranked" },
];

export default function RankingTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [page, setPage] = useState({ current: 1, take: 20 });
  const [filter, setFilter] = useState<filterQuery>({});

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const qs = searchParams?.toString();
  const urlQp: queryParams = qsToQueryParams(qs);

  const { isLoading: checkPermission } = useVerifyPermission([
    "ADMIN",
    "MATCHMAKER",
  ]);

  const queryParams: queryParams = useMemo(() => {
    const qp: queryParams = {
      page: page.current,
      take: page.take,
    };
    qp.filter = filter;

    return qp;
  }, [page, filter]);

  useEffect(() => {
    if (urlQp) {
      if (urlQp?.filter) {
        setFilter(urlQp.filter);
      }
    }
  }, []);

  useEffect(() => {
    const queryString = queryParamsToQs(queryParams);
    router.push(`${pathname}${queryString}`);
  }, [queryParams, pathname, router]);

  const queryString = queryParamsToQs(queryParams);
  const { data: scoringList, isLoading: fetchLoading } = useQuery({
    queryKey: [ENDPOINTS.matchScoring, queryString],
    queryFn: async (): Promise<ScoringResult> => {
      return await getMatchScoring(queryString);
    },
    // placeholderData: (previousData) => previousData,
    refetchOnWindowFocus: false,
  });
  const { data: userScoring, meta } = scoringList || {};

  const handlePageChange = useCallback(
    (key: string, value: number) => {
      setPage({ ...page, [key]: value });
    },
    [page],
  );

  const handleFilterChange = useCallback(
    (key: keyof filterQuery, value: string) => {
      const newFilter = { ...filter };
      if (!!value) {
        newFilter[key] = value;
        if (key === "search") {
          newFilter.search_keys = "first_name,last_name";
        }
      } else {
        delete newFilter[key];
        if (key === "search") {
          delete newFilter.search_keys;
        }
      }
      setFilter(newFilter);
    },
    [filter],
  );

  const columns = useMemo<ColumnDef<userScoring, any>[]>(() => {
    const col = createColumnHelper<userScoring>();
    return [
      col.accessor("i", {
        id: "ID",
        header: "ID",
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
                  filter.ranked
                    ? rankOptions.find((v) => v.value == filter.ranked)
                    : rankOptions[0]
                }
                options={rankOptions}
                onChange={(v: SingleValue<rankOptionItem>) => {
                  const value: filterQuery["ranked"] = v?.value || "";
                  handleFilterChange("ranked", value);
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
  }, [handleFilterChange, filter.ranked]);

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

        {!!meta?.count ? (
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            pageCount={Math.ceil(meta?.count / page.take)}
            onPageChange={({ selected }) =>
              handlePageChange("current", selected + 1)
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
        ) : null}
      </div>
    </div>
  );
}

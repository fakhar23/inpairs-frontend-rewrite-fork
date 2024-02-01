'use client';
import React, { ChangeEvent, useCallback, useMemo, useState } from 'react';
import Link from 'next/link';
import ReactPaginate from 'react-paginate';
import { Button, Loading } from '@/components';
import { queryParams } from '@/api/types';
import CustomInput from '@/components/CustomInput';
import { debounce } from 'lodash';
import Table from '@/components/Table';
import { SortingState } from '@tanstack/react-table';
import Select from 'react-select';
import './style.css';
import { useGetScoring } from '@/api/matchmaking';
import UserLink from '@/components/UserLink';

const rankOptions = [
  { value: null, label: 'All' },
  { value: true, label: 'Ranked' },
  { value: false, label: 'Not Ranked' },
];
interface filterType {
  ranked?: boolean;
}

export default function RankingTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState({ current: 1, take: 10 });
  const [filter, setFilter] = useState<filterType>({});

  const queryParams: queryParams = useMemo(() => {
    const qp: queryParams = {
      page: page.current,
      take: page.take,
    };
    qp.filter = filter;
    if (searchText) {
      qp.filter = {
        ...qp.filter,
        search: searchText,
        search_keys: 'first_name,last_name',
      };
    }

    return qp;
  }, [page, searchText, filter]);

  const { data: scoringList, ...restScoringList } = useGetScoring({
    queryParams,
  });
  const { data: userScoring, meta } = scoringList || {};

  const handlePageChange = useCallback(
    (key: string, value: number) => {
      setPage({ ...page, [key]: value });
    },
    [page]
  );

  const handleFilterChange = useCallback(
    (key: keyof filterType, value: any) => {
      const newFilter = { ...filter };
      if (value) {
        newFilter[key] = value;
      } else {
        delete newFilter[key];
      }
      setFilter(newFilter);
    },
    [filter]
  );

  const columns = useMemo(
    () => [
      {
        id: 1,
        header: 'ID',
        accessorKey: 'i',
      },
      {
        id: 2,
        header: 'NAME',
        accessorKey: 'name',
        cell: ({ row }: any) => <UserLink user={row.original} />,
      },
      {
        id: 3,
        header: () => {
          return (
            <div
              onClick={(e) => e.preventDefault()}
              className="px-6 py-3 flex items-center gap-3"
            >
              <div>Ranking</div>
              <Select
                id="xyz"
                value={
                  rankOptions.find((v) => v.value === !!filter.ranked) ||
                  rankOptions[0]
                }
                options={rankOptions}
                onChange={(v: any) => handleFilterChange('ranked', v.value)}
              />
            </div>
          );
        },

        accessorKey: 'ranked',
      },
      {
        id: 4,
        header: 'POTENTIAL MATCHES',
        accessorKey: 'potential_matches',
      },
      {
        id: 5,
        header: '',
        accessorKey: 'id',
        cell: ({ row }: any) => (
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
      },
    ],
    [handleFilterChange, filter.ranked]
  );

  const data = useMemo(
    () =>
      userScoring?.length
        ? userScoring.map((v, i) => ({
            ...v,
            i: i + 1,
            name: `${v.first_name} ${v.last_name}`,
            ranked: v.ranked ? 'Yes' : 'No',
            potential_matches: v?.UserPotentialyMatched?.length || 0,
          }))
        : [],
    [userScoring]
  );
  const loading = restScoringList.isLoading;

  return (
    <div className="w-full">
      {loading && (
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
            <Button content="History" />
          </Link>
        </div>
        <CustomInput
          id="search ID"
          inputClassName="bg-neutral-100 w-full"
          className="w-full my-5"
          onChange={debounce(
            (e: ChangeEvent<HTMLInputElement>) =>
              setSearchText(e?.target.value),
            700
          )}
          label="Search user"
        />
        <Table
          columns={columns}
          data={data}
          sorting={sorting}
          setSorting={setSorting}
        />

        {!!meta?.count ? (
          <ReactPaginate
            previousLabel={'<'}
            nextLabel={'>'}
            pageCount={Math.ceil(meta?.count / page.take)}
            onPageChange={({ selected }) =>
              handlePageChange('current', selected + 1)
            }
            containerClassName={'pagination'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousClassName={'page-item'}
            previousLinkClassName={'page-link'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link'}
            activeClassName={'active'}
          />
        ) : null}
      </div>
    </div>
  );
}

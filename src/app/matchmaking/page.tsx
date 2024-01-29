"use client";
import React, { useState } from "react";

import { Link } from "@/components";

import ReactPaginate from "react-paginate";
import Select from "react-select";

import UserProfileLayout from "@/layouts/UserProfileLayout";

import "./style.css";
import { Button } from "@/components";

const MatchMakingPage = () => {
  return (
    <UserProfileLayout>
      <div className="flex justify-center items-center">
        <div className=" m-auto">
          <RankingTable />
        </div>
      </div>
    </UserProfileLayout>
  );
};

export default MatchMakingPage;

const rankingTableData = {
  currentPage: 1,
  totalItems: 214,
  pageItems: Array(50)
    .fill({
      id: 7,
      auth_id: "5ba2bf7b-02e1-46d1-85c6-8ce720477167",
      first_name: "Bilal",
      last_name: "Ahmed",
      ranked: true,
      numberOfPotentialMatches: 6,
      UPMMatched: [],
    })
    .map((item, index) => {
      return {
        ...item,
        id: index + 1,
        auth_id: item.auth_id + index,
      };
    }),
};

const rankOptions = [
  { value: null, label: "All" },
  { value: "true", label: "Ranked" },
  { value: "false", label: "Not Ranked" },
];

const RankingTable = () => {
  const scores = rankingTableData.pageItems;

  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 10;
  const pageCount = Math.ceil(scores.length / itemsPerPage);
  const itemsVisited = pageNumber * itemsPerPage;

  const currentPageScores = scores
    .slice(itemsVisited, itemsVisited + itemsPerPage)
    .map((item) => item);

  const changePage = ({ selected }: { selected: number }) => {
    setPageNumber(selected);
  };

  const getTableRows = () =>
    currentPageScores.map((score: any) => (
      <tr key={score.auth_id} className="bg-white border-b">
        <th
          scope="row"
          className="px-6 py-4 font-bryantProMedium text-neutral-900 whitespace-nowrap font-medium"
        >
          <p>{score.id}</p>
        </th>
        <th
          scope="row"
          className="px-6 py-4 font-bryantProMedium text-neutral-900 whitespace-nowrap font-medium"
        >
          <Link
            href={{
              pathname: `/profile/${score.auth_id}`,
            }}
          >{`${score.first_name} ${score.last_name}`}</Link>
        </th>
        <td className="px-6 py-4">{score.ranked ? "Yes" : "No"}</td>
        <td className="px-6 py-4">{score.UPMMatched?.length}</td>
        <td className="px-6 py-4">
          <Link
            href={{
              pathname: `/profile/${score.id}`,
            }}
          >
            <button className="bg-red-500 hover:bg-red-700 ml-3 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Rank
            </button>
          </Link>
        </td>
      </tr>
    ));

  // TODO: Add logic to handle loading
  // if (loading) {
  //   return <Loading />;
  // }

  return (
    <div className="relative overflow-x-auto mt-5">
      <div className="flex justify-between">
        <div className="text-2xl font-medium mb-3 text-red">
          Total: {rankingTableData.totalItems}
        </div>
        <Link href="/matchmaking/history">
          <Button content="History" />
        </Link>
      </div>
      <table className="w-full text-lg text-left text-neutral-500">
        <thead className="text-md text-neutral-700 uppercase bg-neutral-50">
          <tr>
            <th scope="col" className="px-6 py-3 font-normal">
              ID
            </th>
            <th scope="col" className="px-6 py-3 font-normal">
              Name
            </th>
            <th scope="col" className="px-6 py-3 font-normal">
              Ranking
              <Select id="xyz" options={rankOptions} />
            </th>
            <th scope="col" className="px-6 py-3 font-normal">
              Potenital matches
            </th>
            <th scope="col" className="px-6 py-3 font-normal"></th>
          </tr>
        </thead>
        <tbody>{getTableRows()}</tbody>
      </table>
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
  );
};

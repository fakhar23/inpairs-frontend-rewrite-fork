"use client";
import debounce from "lodash/debounce";
import { IoCheckmark, IoClose } from "react-icons/io5";
import { AxiosError } from "axios";
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SortingState } from "@tanstack/react-table";
import { UserProfileLayout } from "@/layouts";
import { Button, Loading } from "@/components";
import CustomInput from "@/components/CustomInput";
import Table from "@/components/Table";
import ReactPaginate from "react-paginate";
import { qsToQueryParams, queryParamsToQs } from "@/api/helpers";
import { ENDPOINTS, getUserList, updateUserStatus } from "@/api";
import { UpdateUserStatus, filterQuery, queryParams } from "@/api/types";
import ModalConfirm from "@/components/Confirm";
import useVerifyPermission from "@/hooks/useVerifyPermission";

const User = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [confirm, setConfirm]: any = useState({ type: "", data: null });
  const [page, setPage] = useState({ current: 1, take: 10 });
  const [filter, setFilter] = useState<filterQuery>({});
  const queryClient = useQueryClient();
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
  const queryString = queryParamsToQs(queryParams);
  const getUser = useQuery({
    queryKey: [ENDPOINTS.users, queryString],
    queryFn: async () => await getUserList(queryString),
    placeholderData: (previousData) => previousData,
    refetchOnWindowFocus: false,
  });
  const { data, meta } = getUser.data || {};
  const { mutateAsync: updateStatus, ...updateRes } = useMutation({
    mutationFn: async (payload: UpdateUserStatus) =>
      await updateUserStatus(payload),
    onSuccess: (a, b) => {
      queryClient.invalidateQueries({ queryKey: [ENDPOINTS.users] });
    },
  });

  const handlePageChange = useCallback(
    (key: string, value: number) => {
      setPage({ ...page, [key]: value });
    },
    [page],
  );

  const handleClose = () => {
    setConfirm({ type: "", data: null });
  };

  const handleConfirm = async (e: any) => {
    try {
      e.preventDefault();
      let payload: any = { id: null };
      if (confirm?.type == "disabled") {
        payload = {
          id: confirm?.data?.id,
          disabled: !confirm?.data?.disabled,
        };
      }
      if (confirm?.type == "deleted") {
        payload = {
          id: confirm?.data?.id,
          deleted: !confirm?.data?.deleted,
        };
      }
      if (confirm?.data?.id) {
        await updateStatus(payload);
      }
      handleClose();
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error.response?.data);
      }
    }
  };

  const confirmDesc = useMemo(() => {
    if (!!confirm?.type) {
      if (confirm?.type == "disabled") {
        if (confirm?.data.disabled) {
          return `Are you sure you want to RESUME subscription for this user?`;
        } else {
          return `Are you sure you want to PAUSE subscription for this user?`;
        }
      }
      if (confirm?.type == "deleted") {
        if (confirm?.data.deleted) {
          return `Are you sure you want to ACTIVATE this user?`;
        } else {
          return `Are you sure you want to DEACTIVATE and CANCEL subscription for this user?`;
        }
      }
    } else {
      return "";
    }
  }, [confirm]);

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
      header: "Subscribed",
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
      header: "Active",
      accessorKey: "deleted",
      cell: ({ row }: any) => {
        const icon = !row?.original?.deleted ? (
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
          <div className="flex flex-row gap-2">
            {!row?.original?.deleted && (
              <Button
                onClick={(e: any) =>
                  setConfirm({ type: "disabled", data: row?.original })
                }
                className={`!rounded-md ${
                  row?.original?.disabled ? "!bg-green-500" : ""
                }`}
              >
                {row?.original?.disabled ? "Resume" : "Pause"}
              </Button>
            )}
            <Button
              onClick={(e: any) =>
                setConfirm({ type: "deleted", data: row?.original })
              }
              className={`!rounded-md ${
                row?.original?.deleted ? "!bg-green-500" : ""
              }`}
            >
              {row?.original?.deleted ? "Activate" : "Deactivate"}
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <UserProfileLayout>
      <div className="max-w-7xl mx-auto">
        {(getUser?.isLoading || checkPermission) && (
          <div className="absolute z-20 top-0 bottom-0 right-0 left-0 flex items-center justify-center bg-black/10">
            <Loading />
          </div>
        )}
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
                // setSearch(e.target.value),
                700,
            )}
            label="Search"
          />

          <Table
            columns={columns}
            data={data || []}
            sorting={sorting}
            setSorting={setSorting}
          />

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

          <ModalConfirm
            open={!!confirm?.type}
            desc={confirmDesc}
            onClose={handleClose}
            onConfirm={handleConfirm}
            isLoading={updateRes.isPending}
          />
        </div>
      </div>
    </UserProfileLayout>
  );
};

export default User;

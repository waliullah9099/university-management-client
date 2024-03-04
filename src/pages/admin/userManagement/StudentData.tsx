import {
  Button,
  Pagination,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import { TQueryParams, TStudent } from "../../../types";
import { useState } from "react";
import { useGetAllStudentQuery } from "../../../redux/feather/admin/userManagement.api";
import { Link } from "react-router-dom";

export type TTable = Pick<TStudent, "fullName" | "id" | "email" | "contactNo">;

const StudentData = () => {
  const [params, setParams] = useState<TQueryParams[]>([]);
  const [page, setPage] = useState(3);
  const { data, isFetching } = useGetAllStudentQuery([
    { name: "limit", value: 4 },
    { name: "page", value: page },
    { name: "sort", value: "id" },
    ...params,
  ]);

  const metaData = data?.meta;

  const studentData = data?.data.map(
    ({ _id, fullName, id, email, contactNo }) => ({
      key: _id,
      fullName,
      id,
      email,
      contactNo,
    })
  );

  const columns: TableColumnsType<TTable> = [
    {
      title: "Name",
      key: "fullName",
      dataIndex: "fullName",
    },
    {
      title: "Roll No",
      key: "id",
      dataIndex: "id",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Contact ",
      key: "contactNo",
      dataIndex: "contactNo",
    },
    {
      title: "Action",
      key: "X",
      render: (item) => {
        return (
          <Space>
            <Link to={`/admin/students-data/${item?.key}`}>
              <Button>Details</Button>
            </Link>
            <Button>Update</Button>
            <Button>Block</Button>
          </Space>
        );
      },
      width: "1%",
    },
    // {
    //   title: "Delete",
    //   key: "Y",
    //   render: () => {
    //     return (
    //       <div>
    //         <Button>
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             fill="none"
    //             viewBox="0 0 24 24"
    //             strokeWidth={1.5}
    //             stroke="currentColor"
    //             height="20px"
    //             width="20px"
    //           >
    //             <path
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
    //             />
    //           </svg>
    //         </Button>
    //       </div>
    //     );
    //   },
    // },
  ];

  const onChange: TableProps<TTable>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const paramsQuery: TQueryParams[] = [];

      filters.name?.forEach((element) =>
        paramsQuery.push({ name: "name", value: element })
      );

      filters.year?.forEach((element) =>
        paramsQuery.push({ name: "year", value: element })
      );

      setParams(paramsQuery);
    }
  };

  return (
    <>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={studentData}
        pagination={false}
        onChange={onChange}
      />
      <Pagination
        style={{ marginTop: "25px", textAlign: "right", fontSize: "18px" }}
        total={metaData?.total}
        pageSize={metaData?.limit}
        onChange={(value) => setPage(value)}
      />
    </>
  );
};

export default StudentData;

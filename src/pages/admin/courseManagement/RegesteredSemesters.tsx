import { Button, Dropdown, Table, TableColumnsType, Tag } from "antd";
import { TSemester, TUpdateStatus } from "../../../types";
import {
  useGetAllRegisteredSemesterQuery,
  useUpdateRegisterSemesterMutation,
} from "../../../redux/feather/admin/courseManagement.api";
import moment from "moment";
import { useState } from "react";

export type TTable = Pick<
  TSemester,
  "academicSemester" | "endDate" | "status" | "endDate" | "_id"
>;

const items = [
  {
    label: "Ongoing",
    key: "ONGOING",
  },
  {
    label: "Upcoming",
    key: "UPCOMING",
  },
  {
    label: "Ended",
    key: "ENDED",
  },
];

const RegesteredSemesters = () => {
  const [semesterId, setSemesterId] = useState("");
  const { data, isFetching } = useGetAllRegisteredSemesterQuery(undefined);
  const [updateSemesterStatus] = useUpdateRegisterSemesterMutation(undefined);

  const semesterData = data?.data.map(
    ({ _id, academicSemester, startDate, endDate, status }) => ({
      key: _id,
      name: `${academicSemester.name} ${academicSemester.year}`,
      status,
      startDate: moment(new Date(startDate)).format("MMMM"),
      endDate: moment(new Date(endDate)).format("MMM"),
    })
  );

  const handleStatusUpdate = (data) => {
    const updateData = {
      id: semesterId,
      data: {
        status: data.key,
      },
    };

    updateSemesterStatus(updateData);
  };

  const menuProps = {
    items,
    onClick: handleStatusUpdate,
  };

  const columns: TableColumnsType<TTable> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (item) => {
        let color;
        if (item === "ONGOING") {
          color = "green";
        } else if (item === "UPCOMING") {
          color = "blue";
        } else if (item === "ENDED") {
          color = "red";
        }

        return <Tag color={color}>{item}</Tag>;
      },
    },
    {
      title: "Start Date",
      key: "startDate",
      dataIndex: "startDate",
    },
    {
      title: "End Date",
      key: "endDate",
      dataIndex: "endDate",
    },
    {
      title: "Action",
      key: "X",
      render: (item) => {
        return (
          <Dropdown menu={menuProps} trigger={["click"]}>
            <Button onClick={() => setSemesterId(item.key)}>Update</Button>
          </Dropdown>
        );
      },
    },
  ];

  return (
    <Table
      style={{ fontSize: " 22px" }}
      loading={isFetching}
      columns={columns}
      dataSource={semesterData}
      // onChange={onChange}
    />
  );
};

export default RegesteredSemesters;

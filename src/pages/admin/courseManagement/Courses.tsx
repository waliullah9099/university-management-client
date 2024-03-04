import { Button, Modal, Table, TableColumnsType, Tag } from "antd";
import { TCourse } from "../../../types";
import {
  useCreateFacultyMutation,
  useGetAllCourseQuery,
} from "../../../redux/feather/admin/courseManagement.api";
import { useState } from "react";
import PhSelect from "../../../components/form/PhSelect";
import PhForm from "../../../components/form/PhForm";
import { useGetAllFacultyQuery } from "../../../redux/feather/admin/userManagement.api";

export type TTable = Pick<
  TCourse,
  "_id" | "title" | "code" | "isDeleted" | "prefix"
>;

const Courses = () => {
  const { data, isFetching } = useGetAllCourseQuery(undefined);

  const courseData = data?.data.map(({ _id, title, code, isDeleted }) => ({
    key: _id,
    title: title,
    isDeleted: isDeleted,
    code: `${code}`,
  }));

  //   const handleStatusUpdate = (data) => {
  //     const updateData = {
  //       id: semesterId,
  //       data: {
  //         status: data.key,
  //       },
  //     };

  //     updateSemesterStatus(updateData);
  //   };

  //   const menuProps = {
  //     items,
  //     onClick: handleStatusUpdate,
  //   };

  const columns: TableColumnsType<TTable> = [
    {
      title: "Name",
      key: "title",
      dataIndex: "title",
    },
    {
      title: "isDeleted",
      key: "isDeleted",
      dataIndex: "isDeleted",
      render: (item) => {
        let color;
        if (item == true) {
          color = "green";
        } else if (item == false) {
          color = "orange";
        }
        return (
          <Tag style={{ fontSize: "18px", padding: "6px 14px" }} color={color}>
            {`${item}`}
          </Tag>
        );
      },
    },
    {
      title: "Code",
      key: "code",
      dataIndex: "code",
    },
    {
      title: "Action",
      key: "X",
      render: (item) => {
        return <AddFacultyModal facultyInfo={item} />;
      },
    },
    // {
    //   title: "Action",
    //   key: "X",
    //   render: (item) => {
    //     return (
    //       <Dropdown menu={menuProps} trigger={["click"]}>
    //         <Button onClick={() => setSemesterId(item.key)}>Update</Button>
    //       </Dropdown>
    //     );
    //   },
    // },
  ];

  return (
    <Table
      style={{ fontSize: " 22px" }}
      loading={isFetching}
      columns={columns}
      dataSource={courseData}
      // onChange={onChange}
    />
  );
};

const AddFacultyModal = ({ facultyInfo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: academicFaculty } = useGetAllFacultyQuery(undefined);
  const [createFaculty] = useCreateFacultyMutation();

  const facultyOptions = academicFaculty?.data?.map((item) => ({
    value: item._id,
    label: item.fullName,
  }));

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleSubmit = (data) => {
    const facultyData = {
      courseId: facultyInfo.key,
      data,
    };
    createFaculty(facultyData);
  };

  return (
    <>
      <Button onClick={showModal}>Assign Faculty</Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <PhForm onSubmit={handleSubmit}>
          <PhSelect
            mode="multiple"
            name="faculties"
            label="Faculty"
            options={facultyOptions}
          />
          <Button htmlType="submit">Submit</Button>
        </PhForm>
      </Modal>
    </>
  );
};

export default Courses;

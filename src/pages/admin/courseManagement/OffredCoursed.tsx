import { Col, Flex } from "antd";
import PhSelect from "../../../components/form/PhSelect";
import PhForm from "../../../components/form/PhForm";
import PhDatePicker from "../../../components/form/PhDatePicker";
import { useGetAllFacultyQuery } from "../../../redux/feather/admin/userManagement.api";
import { useGetAcademicDepertmentQuery } from "../../../redux/feather/admin/academicManagement.api";
import PhSelectWithWatch from "../../../components/form/PhSelectWithWatch";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";

const OffredCoursed = () => {
  const [id, setId] = useState("");
  console.log("inside parent conponent", id);

  const { data: academicFaculty } = useGetAllFacultyQuery(undefined);
  const { data: academicDepertment } = useGetAcademicDepertmentQuery(undefined);

  const academicFacultyOptions = academicFaculty?.data?.map((item) => ({
    value: item._id,
    label: item.academicFaculty.name,
  }));
  const academicDepartmentOptions = academicDepertment?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };
  return (
    <Flex justify="center" align="center">
      <Col span={12}>
        <PhForm onSubmit={onSubmit}>
          <PhSelectWithWatch
            label="Academic Faculty"
            name="academicFaculty"
            options={academicFacultyOptions}
            onValueChange={setId}
          />
          <PhSelect
            label="Academic Department"
            name="academicDepartment"
            options={academicDepartmentOptions}
            disabled={!id}
          />
          <PhSelect
            label="Days"
            name="days"
            options={academicDepartmentOptions}
          />
          <PhDatePicker label="Start Time" name="startTime" />
          <PhDatePicker label="End Time" name="End Time" />
        </PhForm>
      </Col>
    </Flex>
  );
};

export default OffredCoursed;

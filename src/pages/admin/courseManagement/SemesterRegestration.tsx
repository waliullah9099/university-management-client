import { FieldValues, SubmitHandler } from "react-hook-form";
import PhForm from "../../../components/form/PhForm";
import { Button, Col, Flex } from "antd";
import PhSelect from "../../../components/form/PhSelect";
import { statusOptions } from "../../../constants/semesters";
import { useGetAllSemesterQuery } from "../../../redux/feather/admin/academicManagement.api";
import PhDatePicker from "../../../components/form/PhDatePicker";
import PhInput from "../../../components/form/PhInput";
import { useCreateRegisterSemesterMutation } from "../../../redux/feather/admin/courseManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types";

const SemesterRegestration = () => {
  const [createRegisteredSemseter] = useCreateRegisterSemesterMutation();
  const { data: academicSemester } = useGetAllSemesterQuery([
    { name: "sort", value: "year" },
  ]);

  const academicSemesterOptions = academicSemester?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    const semesterDate = {
      ...data,
      minCredit: Number(data.minCredit),
      maxCredit: Number(data.maxCredit),
    };

    try {
      const res = (await createRegisteredSemseter(
        semesterDate
      )) as TResponse<any>;
      if (res?.error) {
        toast.error(res?.error.data.message, { id: toastId });
      } else {
        toast.success("semester is created", { id: toastId });
      }
    } catch (error) {
      toast.error("something is error", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={12}>
        <PhForm onSubmit={onSubmit}>
          <PhSelect
            label="Academic Semester"
            name="academicSemester"
            options={academicSemesterOptions}
          />
          <PhSelect label="Status" name="status" options={statusOptions} />
          <PhDatePicker label="Start Date" name="startDate" />
          <PhDatePicker label="End Date" name="endDate" />
          <PhInput type="number" name="minCredit" label="Min Credit" />
          <PhInput type="number" name="maxCredit" label="Max Credit" />
          <Button htmlType="submit">Submit</Button>
        </PhForm>
      </Col>
    </Flex>
  );
};

export default SemesterRegestration;

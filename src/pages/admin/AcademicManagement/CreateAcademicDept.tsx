import { Button, Col, Flex } from "antd";
import PhForm from "../../../components/form/PhForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  useCreateAcademicDepertmentMutation,
  useGetAcademicDepertmentQuery,
  useGetAcademicFacultyQuery,
} from "../../../redux/feather/admin/academicManagement.api";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { academicDepertmentSchema } from "../../../shemas/academic.management.schema";
import PhInput from "../../../components/form/PhInput";
import PhSelect from "../../../components/form/PhSelect";

const CreateAcademicDept = () => {
  const { data, isLoading } = useGetAcademicFacultyQuery(undefined);

  const facultyOptions = data?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const [createAcademicDepertment] = useCreateAcademicDepertmentMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    try {
      const res = await createAcademicDepertment(data);
      if (res?.error) {
        toast.error(res?.error?.data.message, { id: toastId });
      } else {
        toast.success("Depertment is create", { id: toastId });
      }
    } catch (error) {
      toast.error("something is error", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={9}>
        <PhForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicDepertmentSchema)}
        >
          <PhInput type="text" name="name" label="Name" />
          <PhSelect
            options={facultyOptions}
            disabled={isLoading}
            name="academicFaculty"
            label="Academic Faculty"
          />
          <Button htmlType="submit">Submit</Button>
        </PhForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicDept;

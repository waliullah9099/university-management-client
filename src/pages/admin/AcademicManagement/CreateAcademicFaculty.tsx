import { Button, Col, Flex } from "antd";
import PhForm from "../../../components/form/PhForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useCreateAcademicFacultyMutation } from "../../../redux/feather/admin/academicManagement.api";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { academicFacultySchema } from "../../../shemas/academic.management.schema";
import PhInput from "../../../components/form/PhInput";

const CreateAcademicFaculty = () => {
  const [createAcademicFaculty] = useCreateAcademicFacultyMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    try {
      const res = await createAcademicFaculty(data);
      if (res?.error) {
        toast.error(res?.error?.data.message, { id: toastId });
      } else {
        toast.success("Faculty is create", { id: toastId });
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
          resolver={zodResolver(academicFacultySchema)}
        >
          <PhInput type="text" name="name" label="Faculty Name" />
          <Button htmlType="submit">Submit</Button>
        </PhForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicFaculty;

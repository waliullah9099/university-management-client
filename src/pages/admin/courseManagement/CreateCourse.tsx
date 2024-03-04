import { FieldValues, SubmitHandler } from "react-hook-form";
import PhForm from "../../../components/form/PhForm";
import { Button, Col, Flex } from "antd";
import PhSelect from "../../../components/form/PhSelect";
import PhInput from "../../../components/form/PhInput";
import {
  useCreateCourseMutation,
  useGetAllCourseQuery,
} from "../../../redux/feather/admin/courseManagement.api";
import { toast } from "sonner";
import { TCourse, TResponse } from "../../../types";

const CreateCourse = () => {
  const [createCourse] = useCreateCourseMutation();
  const { data: courses } = useGetAllCourseQuery(undefined);

  const preRequisiteCoursesOptions = courses?.data?.map((item) => ({
    value: item._id,
    label: item.title,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    const courseDate = {
      ...data,
      isDeleted: false,
      code: Number(data.code),
      credits: Number(data.credits),
      preRequisiteCourses: data?.preRequisiteCourses?.map((item: TCourse) => ({
        course: item,
        isDeleted: false,
      })),
    };

    try {
      const res = (await createCourse(courseDate)) as TResponse<any>;
      console.log("before saved", res);

      if (res?.error) {
        toast.error(res?.error.data.message, { id: toastId });
      } else {
        toast.success("Course is created", { id: toastId });
      }
    } catch (error) {
      toast.error("something is error", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={12}>
        <PhForm onSubmit={onSubmit}>
          <PhInput type="text" label="Title" name="title" />
          <PhInput type="text" label="Prefix" name="prefix" />
          <PhInput type="text" label="Credits" name="credits" />
          <PhInput type="Number" label="Code" name="code" />
          <PhSelect
            label=" PreRequisite Courses"
            name="preRequisiteCourses"
            mode="multiple"
            options={preRequisiteCoursesOptions}
          />

          <Button htmlType="submit">Submit</Button>
        </PhForm>
      </Col>
    </Flex>
  );
};

export default CreateCourse;

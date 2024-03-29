import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PhForm from "../../../components/form/PhForm";
import PhInput from "../../../components/form/PhInput";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import PhSelect from "../../../components/form/PhSelect";
import { bloodGroupOptions, genderOptions } from "../../../constants/global";
import PhDatePicker from "../../../components/form/PhDatePicker";
import {
  useGetAcademicDepertmentQuery,
  useGetAllSemesterQuery,
} from "../../../redux/feather/admin/academicManagement.api";
import { useCreateStudentMutation } from "../../../redux/feather/admin/userManagement.api";

export const studentDummyData = {
  password: "student123",
  student: {
    name: {
      firstName: "I am ",
      middleName: "Student",
      lastName: "Number 1",
    },

    gender: "male",
    dateOfBirth: "1990-01-01",
    bloogGroup: "A+",

    email: "student2@gmail.com",
    contactNo: "1235678",
    emergencyContactNo: "987-654-3210",
    presentAddress: "123 Main St, Cityville",
    permanentAddress: "456 Oak St, Townsville",

    guardian: {
      fatherName: "James Doe",
      fatherOccupation: "Engineer",
      fatherContactNo: "111-222-3333",
      motherName: "Mary Doe",
      motherOccupation: "Teacher",
      motherContactNo: "444-555-6666",
    },

    localGuardian: {
      name: "Alice Johnson",
      occupation: "Doctor",
      contactNo: "777-888-9999",
      address: "789 Pine St, Villageton",
    },

    admissionSemester: "65b0104110b74fcbd7a25d92",
    academicDepartment: "65b00fb010b74fcbd7a25d8e",
  },
};

const studentDefaultValues = {
  name: {
    firstName: "I am ",
    middleName: "Student",
    lastName: "Number 1",
  },

  gender: "male",
  // dateOfBirth: "1990-01-01",
  bloogGroup: "A+",

  email: "student2@gmail.com",
  contactNo: "1235678",
  emergencyContactNo: "987-654-3210",
  presentAddress: "123 Main St, Cityville",
  permanentAddress: "456 Oak St, Townsville",

  guardian: {
    fatherName: "James Doe",
    fatherOccupation: "Engineer",
    fatherContactNo: "111-222-3333",
    motherName: "Mary Doe",
    motherOccupation: "Teacher",
    motherContactNo: "444-555-6666",
  },

  localGuardian: {
    name: "Alice Johnson",
    occupation: "Doctor",
    contactNo: "777-888-9999",
    address: "789 Pine St, Villageton",
  },

  // admissionSemester: "65b0104110b74fcbd7a25d92",
  // academicDepartment: "65b00fb010b74fcbd7a25d8e",
};

const CreateStudent = () => {
  const [createStudent] = useCreateStudentMutation();
  // console.log({ data, isError });

  const { data: sData, isLoading: sIsLoading } =
    useGetAllSemesterQuery(undefined);

  const { data: dData, isLoading: dIsLoading } = useGetAcademicDepertmentQuery(
    undefined,
    { skip: sIsLoading }
  );
  const semesterOptions = sData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));
  const depertmentOptions = dData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const studentData = {
      password: "student87",
      student: data,
    };

    const formData = new FormData();

    formData.append("file", data.image);
    formData.append("data", JSON.stringify(studentData));

    createStudent(formData);

    // ! this is for development, just for checkong
    console.log(Object.fromEntries(formData));
  };
  return (
    <Row>
      <Col span={24}>
        <PhForm onSubmit={onSubmit} defaultValues={studentDefaultValues}>
          <Divider>Personal Information</Divider>
          <Row gutter={8}>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <PhInput type="text" name="name.firstName" label="First Name" />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <PhInput type="text" name="name.middleName" label="Middle Name" />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <PhInput type="text" name="name.lastName" label="Last Name" />
            </Col>

            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <PhSelect options={genderOptions} name="gender" label="Gender" />
            </Col>

            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <Controller
                name="image"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="Picture">
                    <Input
                      type="file"
                      value={value?.fileName}
                      {...field}
                      size="large"
                      onChange={(e) => onChange(e.target.files?.[0])}
                    />
                  </Form.Item>
                )}
              />
            </Col>

            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <PhSelect
                options={bloodGroupOptions}
                name="bloogGroup"
                label="Blood Group"
              />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <PhDatePicker name="dateOfBirth" label="Date Of Birth" />
            </Col>
          </Row>

          <Divider>Contact Information</Divider>
          <Row gutter={8}>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <PhInput type="email" name="email" label="Email" />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <PhInput type="number" name="contactNo" label="Contact No" />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <PhInput
                type="number"
                name="emergencyContactNo"
                label="Emergency Contact No"
              />
            </Col>

            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <PhInput
                type="text"
                name="presentAddress"
                label="Present Address"
              />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <PhInput
                type="text"
                name="permanentAddress"
                label="Permanent Address"
              />
            </Col>
          </Row>

          <Divider>Guardian</Divider>
          <Row gutter={8}>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <PhInput
                type="text"
                name="guardian.fatherName"
                label="Father Name"
              />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <PhInput
                type="text"
                name="guardian.fatherOccupation"
                label="Father Occupation"
              />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <PhInput
                type="number"
                name="guardian.fatherContactNo"
                label="Father Contact No"
              />
            </Col>

            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <PhInput
                type="text"
                name="guardian.motherName"
                label="Mother Name"
              />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <PhInput
                type="text"
                name="guardian.motherOccupation"
                label="Mother Occupation"
              />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <PhInput
                type="number"
                name="guardian.motherContactNo"
                label="Mother Contact No"
              />
            </Col>
          </Row>

          <Divider>Local Guardian</Divider>
          <Row gutter={8}>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <PhInput type="text" name="localGuardian.name" label="Name" />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <PhInput
                type="text"
                name="localGuardian.occupation"
                label="Occupation"
              />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <PhInput
                type="number"
                name="localGuardian.contactNo"
                label="Contact No"
              />
            </Col>

            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <PhInput
                type="text"
                name="localGuardian.address"
                label="Address"
              />
            </Col>
          </Row>

          <Divider>Academic Information</Divider>
          <Row gutter={8}>
            <Col span={24} lg={{ span: 12 }} md={{ span: 12 }}>
              <PhSelect
                options={semesterOptions}
                disabled={sIsLoading}
                name="admissionSemester"
                label="Admission Semester"
              />
            </Col>
            <Col span={24} lg={{ span: 12 }} md={{ span: 12 }}>
              <PhSelect
                options={depertmentOptions}
                disabled={dIsLoading}
                name="academicDepartment"
                label="Academic Department"
              />
            </Col>
          </Row>

          <Button htmlType="submit">Submit</Button>
        </PhForm>
      </Col>
    </Row>
  );
};

export default CreateStudent;

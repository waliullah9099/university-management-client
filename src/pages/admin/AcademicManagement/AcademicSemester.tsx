import { useGetAllSemesterQuery } from "../../../redux/feather/academicSemister/academicSemesterApi";

const AcademicSemester = () => {
  const { data } = useGetAllSemesterQuery(undefined);
  console.log(data);

  return <div>AcademicSemester</div>;
};

export default AcademicSemester;

import { useParams } from "react-router-dom";

const StudentDetails = () => {
  const params = useParams();

  return (
    <div>
      <h1>This is student details page of {params.studentId}</h1>
    </div>
  );
};

export default StudentDetails;

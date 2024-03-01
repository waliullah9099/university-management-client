export type TAcademicSemester = {
  _id: string;
  name: string;
  year: string;
  code: string;
  startMonth: string;
  endMonth: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
export type TAcademicFaculty = {
  _id: string;
  name: string;
};
export type TAcademicDepertment = {
  _id: string;
  name: string;
  academicFaculty: string;
};

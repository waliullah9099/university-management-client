import { TAcademicSemester } from ".";

export type TSemester = {
  academicSemester: TAcademicSemester;
  createdAt: string;
  endDate: string;
  maxCredit: number;
  minCredit: number;
  startDate: string;
  status: string;
  updatedAt: string;
  _id: string;
};

export type TCourse = {
  _id: string;
  title: string;
  prefix: string;
  code: number;
  credits: number;
  isDeleted: boolean;
  preRequisiteCourses: TPreRequisiteCourse[];
};

export type TPreRequisiteCourse = {
  course: string;
  isDeleted: boolean;
};

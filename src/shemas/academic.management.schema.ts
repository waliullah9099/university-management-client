import { z } from "zod";

export const academicSemesterSchema = z.object({
  name: z.string({ required_error: "Please select Name" }),
  year: z.string({ required_error: "Please select Year" }),
  startMonth: z.string({ required_error: "Please select Start Month" }),
  endMonth: z.string({ required_error: "Please select End Month" }),
});
export const academicFacultySchema = z.object({
  name: z.string({ required_error: "Name is required" }),
});

export const academicDepertmentSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  academicFaculty: z.string({ required_error: "Academic Faculty is required" }),
});

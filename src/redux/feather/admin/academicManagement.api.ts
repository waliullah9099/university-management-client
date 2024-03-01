import {
  TAcademicDepertment,
  TAcademicFaculty,
  TAcademicSemester,
  TQueryParams,
  TResponseRedux,
} from "../../../types";
import { baseApi } from "../../api/baseApi";

const academicMangementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemester: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((element: TQueryParams) => {
            params.append(element.name, element.value as string);
          });
        }

        return {
          url: "/academic-semesters",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TAcademicSemester[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    createAcademicSemester: builder.mutation({
      query: (data) => ({
        url: "/academic-semesters/create-academic-semester",
        method: "POST",
        body: data,
      }),
    }),
    getAcademicFaculty: builder.query({
      query: () => ({
        url: "/academic-faculties",
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<TAcademicFaculty[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    createAcademicFaculty: builder.mutation({
      query: (data) => {
        return {
          url: "/academic-faculties/create-academic-faculty",
          method: "POST",
          body: data,
        };
      },
    }),
    getAcademicDepertment: builder.query({
      query: () => ({
        url: "/academic-departments",
        method: "GET",
      }),

      transformResponse: (response: TResponseRedux<TAcademicDepertment[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    createAcademicDepertment: builder.mutation({
      query: (data) => ({
        url: "/academic-departments/create-academic-department",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllSemesterQuery,
  useCreateAcademicSemesterMutation,
  useGetAcademicFacultyQuery,
  useCreateAcademicFacultyMutation,
  useCreateAcademicDepertmentMutation,
  useGetAcademicDepertmentQuery,
} = academicMangementApi;

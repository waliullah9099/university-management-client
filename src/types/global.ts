import { BaseQueryApi } from "@reduxjs/toolkit/query";
import React from "react";

export type TErrorResponse = {
  data: {
    message: string;
    stack: string;
    success: boolean;
  };

  status: number;
};

export type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

export type TResponse<T> = {
  data?: T;
  error?: TErrorResponse;
  meta?: TMeta;
  success: boolean;
  message: string;
};

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;

export type TQueryParams = {
  name: string;
  value: boolean | React.Key;
};

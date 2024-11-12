import { Response } from "express";

type TResponseData<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
};

const sendResponse = <T>(res: Response, data: TResponseData<T>) => {
  res.status(data?.statusCode).json({
    success: data.success,
    status: data.statusCode,
    message: data?.message || "Successfully Work Done",
    data: data.data,
  });
};

export default sendResponse;

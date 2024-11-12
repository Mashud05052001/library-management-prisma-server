import { Response } from "express";

type TResponseData<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  data?: T;
};

const sendResponse = <T>(res: Response, data: TResponseData<T>) => {
  const responsePayload = {
    success: data.success,
    status: data.statusCode,
    message: data.message || "Successfully completed",
  };

  if (data.data) {
    res.status(data.statusCode).json({ ...responsePayload, data: data.data });
  } else {
    res.status(data.statusCode).json(responsePayload);
  }
};

export default sendResponse;

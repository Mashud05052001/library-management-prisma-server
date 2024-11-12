import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import globalErrorhandler from "./app/middleware/globalErrorHandler";
import { AllRoutes } from "./app/routes";
import notFound from "./app/middleware/notFound";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send({
    success: true,
    message: "Server successfuly running",
  });
});

app.use("/api", AllRoutes);

app.use(globalErrorhandler);
app.use(notFound);
export default app;

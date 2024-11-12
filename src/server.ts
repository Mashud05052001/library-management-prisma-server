import dotenv from "dotenv";
import { Server } from "http";
import app from "./app";
import config from "./app/config";
dotenv.config();
const port = config.port || 5000;

let server: Server;
async function connectDB() {
  try {
    server = app.listen(port, () => {
      console.log(`Server is running on ${port} PORT`);
    });
  } catch (e) {
    console.log(`👀👀 Server connection time error found!`);
    process.exit(1);
  }
}

connectDB();

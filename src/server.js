import http from "http";
import dotenv from "dotenv";
import app from "./app.js";
import { connectToMongo } from "./service/connectToMongo.js";
dotenv.config();

const server = http.createServer(app);
const PORT=process.env.PORT || 8000;

async function startserver() {
  await connectToMongo();
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startserver();

import express from "express";
import { AuthRouter } from "./routes/auth/auth.routes.js";
import cors from "cors";
import { ProjectRouter } from "./routes/project/project.routes.js";
import { TaskRouter } from "./routes/task/task.routes.js";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors(["http://localhost:3000"]));

app.use("/", AuthRouter);
app.use("/", ProjectRouter);
app.use("/", TaskRouter);

export default app;

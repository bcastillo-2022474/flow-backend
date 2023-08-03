import express from "express";
import userRouter from "./routes/user.routes";
import taskRoutes from "./routes/task.routes";
import attachmentRoutes from "./routes/attachment.routes";
import projectRoutes from "./routes/project.routes";
import commentRoutes from "./routes/comment.routes";
import sprintRoutes from "./routes/sprint.routes";
import columnRoutes from "./routes/column.routes";
import signInUpRoutes from "./routes/sign-in-up.routes";

const { PORT } = process.env;
const app = express();

app.use(express.json());
app.use("/api", signInUpRoutes);
app.use("/api", userRouter);
app.use("/api", taskRoutes);
app.use("/api", attachmentRoutes);
app.use("/api", projectRoutes);
app.use("/api", commentRoutes);
app.use("/api", sprintRoutes);
app.use("/api", columnRoutes);

app.listen(PORT, () => console.log(`Server UP in ${PORT}`));

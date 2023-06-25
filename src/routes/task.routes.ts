import createBasicRoute from "./createBasicRoute";
import prisma from "../dao/connection";

const router = createBasicRoute("task", prisma.task);

export default router;

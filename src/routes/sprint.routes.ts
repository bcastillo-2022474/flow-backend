import createBasicRoute from "./createBasicRoute";
import prisma from "../dao/connection";

const router = createBasicRoute("sprint", prisma.sprint);

export default router;
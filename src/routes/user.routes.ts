import prisma from "../dao/connection";
import createBasicRoute from "./createBasicRoute";

const router = createBasicRoute("user", prisma.user);

export default router;

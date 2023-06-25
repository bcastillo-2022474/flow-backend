import createBasicRoute from "./createBasicRoute";
import prisma from "../dao/connection";

const route = createBasicRoute("attachment", prisma.attachment);

export default route;

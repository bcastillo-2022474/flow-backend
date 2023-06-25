import createBasicRoute from "./createBasicRoute";
import prisma from "../dao/connection";

const route = createBasicRoute("project", prisma.project);

export default route;

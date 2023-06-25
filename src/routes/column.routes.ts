import createBasicRoute from "./createBasicRoute";
import prisma from "../dao/connection";

const route = createBasicRoute("column", prisma.column);

export default route;

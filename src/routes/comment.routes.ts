import createBasicRoute from "./createBasicRoute";
import prisma from "../dao/connection";

const route = createBasicRoute("comment", prisma.comment);

export default route;

import { Router } from "express";
import handleError from "../errorHadler";
import prisma from "../dao/connection";

const router = Router();

router
  .route("/column")
  .get(async (req, res) => {
    const columns = await prisma.column.findMany().catch(handleError(res));
    if (!columns) return;

    if (columns.length === 0) {
      res.status(404).send("No column found");
      return;
    }

    res.json(columns);
  })
  .post(async (req, res) => {
    const column = await prisma.column
      .create({
        data: req.body,
      })
      .catch(handleError(res));

    if (!column) return;

    res.json(column);
  });

router
  .route("/column/:id")
  .get(async (req, res) => {
    const column = await prisma.column
      .findUnique({
        where: {
          id: req.params.id,
        },
        include: {
          project: true,
        },
      })
      .catch(handleError(res));

    if (!column) return;
    res.json(column);
  })
  .put(async (req, res) => {
    const column = await prisma.column
      .update({
        where: {
          id: req.params.id,
        },
        data: req.body,
      })
      .catch(handleError(res));

    if (!column) return;

    res.json(column);
  })
  .delete(async (req, res) => {
    const column = await prisma.column
      .delete({
        where: {
          id: req.params.id,
        },
      })
      .catch(handleError(res));

    if (!column) return;

    res.json(column);
  });

export default router;

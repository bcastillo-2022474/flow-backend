import { Router } from "express";
import handleError from "../errorHadler";
import prisma from "../dao/connection";

const router = Router();

router
  .route("/task")
  .get(async (req, res) => {
    const tasks = await prisma.task.findMany().catch(handleError(res));
    if (!tasks) return;

    if (tasks.length === 0) {
      res.status(404).send("No task found");
      return;
    }

    res.json(tasks);
  })
  .post(async (req, res) => {
    const task = await prisma.task
      .create({
        data: req.body,
      })
      .catch(handleError(res));

    if (!task) return;

    res.json(task);
  });

router
  .route("/task/:id")
  .get(async (req, res) => {
    const task = await prisma.task
      .findUnique({
        where: {
          id: req.params.id,
        },
        include: {
          assignedTo: true,
          attachments: true,
          comments: true,
          sprint: true,
          column: true,
        },
      })
      .catch(handleError(res));

    if (!task) return;
    res.json(task);
  })
  .put(async (req, res) => {
    const task = await prisma.task
      .update({
        where: {
          id: req.params.id,
        },
        data: req.body,
      })
      .catch(handleError(res));

    if (!task) return;

    res.json(task);
  })
  .delete(async (req, res) => {
    const task = await prisma.task
      .delete({
        where: {
          id: req.params.id,
        },
      })
      .catch(handleError(res));

    if (!task) return;

    res.json(task);
  });

export default router;

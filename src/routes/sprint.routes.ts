import { Router } from "express";
import handleError from "../errorHadler";
import prisma from "../dao/connection";

const router = Router();

router
  .route("/sprint")
  .get(async (req, res) => {
    const sprints = await prisma.sprint.findMany().catch(handleError(res));
    if (!sprints) return;

    if (sprints.length === 0) {
      res.status(404).send("No sprint found");
      return;
    }

    res.json(sprints);
  })
  .post(async (req, res) => {
    const sprint = await prisma.sprint
      .create({
        data: req.body,
      })
      .catch(handleError(res));

    if (!sprint) return;

    res.json(sprint);
  });

router
  .route("/sprint/:id")
  .get(async (req, res) => {
    const sprint = await prisma.sprint
      .findUnique({
        where: {
          id: req.params.id,
        },
        include: {
          createdBy: true,
          project: true,
          tasks: true
        }
      })
      .catch(handleError(res));

    if (!sprint) return;
    res.json(sprint);
  })
  .put(async (req, res) => {
    const sprint = await prisma.sprint
      .update({
        where: {
          id: req.params.id,
        },
        data: req.body,
      })
      .catch(handleError(res));

    if (!sprint) return;

    res.json(sprint);
  })
  .delete(async (req, res) => {
    const sprint = await prisma.sprint
      .delete({
        where: {
          id: req.params.id,
        },
      })
      .catch(handleError(res));

    if (!sprint) return;

    res.json(sprint);
  });

export default router;

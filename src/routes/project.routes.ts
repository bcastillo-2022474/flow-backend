import { Router } from "express";
import handleError from "../errorHadler";
import prisma from "../dao/connection";

const router = Router();

router
  .route("/project")
  .get(async (req, res) => {
    const projects = await prisma.project
      .findMany({
        include: {
          members: true,
        },
      })
      .catch(handleError(res));
    if (!projects) return;

    if (projects.length === 0) {
      res.status(404).send("No project found");
      return;
    }

    res.json(projects);
  })
  .post(async (req, res) => {
    const project = await prisma.project
      .create({
        data: req.body,
      })
      .catch(handleError(res));

    if (!project) return;

    res.json(project);
  });

router
  .route("/project/:id")
  .get(async (req, res) => {
    const project = await prisma.project
      .findUnique({
        where: {
          id: req.params.id,
        },
        include: {
          members: true,
          sprints: true,
          columns: true,
        },
      })
      .catch(handleError(res));

    if (!project) return;
    res.json(project);
  })
  .put(async (req, res) => {
    const project = await prisma.project
      .update({
        where: {
          id: req.params.id,
        },
        data: req.body,
      })
      .catch(handleError(res));

    if (!project) return;

    res.json(project);
  })
  .delete(async (req, res) => {
    const project = await prisma.project
      .delete({
        where: {
          id: req.params.id,
        },
      })
      .catch(handleError(res));

    if (!project) return;

    res.json(project);
  });

export default router;

import { Router } from "express";
import handleError from "../errorHadler";
import prisma from "../dao/connection";

const router = Router();

router
  .route("/ProjectLevelPermission")
  .get(async (req, res) => {
    const ProjectLevelPermissions = await prisma.projectLevelPermission
      .findMany()
      .catch(handleError(res));
    if (!ProjectLevelPermissions) return;

    if (ProjectLevelPermissions.length === 0) {
      res.status(404).send("No ProjectLevelPermission found");
      return;
    }

    res.json(ProjectLevelPermissions);
  })
  .post(async (req, res) => {
    const ProjectLevelPermission = await prisma.projectLevelPermission
      .create({
        data: req.body,
      })
      .catch(handleError(res));

    if (!ProjectLevelPermission) return;

    res.json(ProjectLevelPermission);
  });

router
  .route("/ProjectLevelPermission/:id")
  .get(async (req, res) => {
    const ProjectLevelPermission = await prisma.projectLevelPermission
      .findUnique({
        where: {
          id: req.params.id,
        },
        include: {
          user: true,
          project: true,
        },
      })
      .catch(handleError(res));

    if (!ProjectLevelPermission) return;
    res.json(ProjectLevelPermission);
  })
  .put(async (req, res) => {
    const ProjectLevelPermission = await prisma.projectLevelPermission
      .update({
        where: {
          id: req.params.id,
        },
        data: req.body,
      })
      .catch(handleError(res));

    if (!ProjectLevelPermission) return;

    res.json(ProjectLevelPermission);
  })
  .delete(async (req, res) => {
    const ProjectLevelPermission = await prisma.projectLevelPermission
      .delete({
        where: {
          id: req.params.id,
        },
      })
      .catch(handleError(res));

    if (!ProjectLevelPermission) return;

    res.json(ProjectLevelPermission);
  });

export default router;

import { Router } from "express";
import handleError from "../errorHadler";
import prisma from "../dao/connection";

const router = Router();

router
  .route("/OrganizationMembers")
  .get(async (req, res) => {
    const OrganizationMemberss = await prisma.organizationMembers
      .findMany()
      .catch(handleError(res));
    if (!OrganizationMemberss) return;

    if (OrganizationMemberss.length === 0) {
      res.status(404).send("No OrganizationMembers found");
      return;
    }

    res.json(OrganizationMemberss);
  })
  .post(async (req, res) => {
    const OrganizationMembers = await prisma.organizationMembers
      .create({
        data: req.body,
      })
      .catch(handleError(res));

    if (!OrganizationMembers) return;

    res.json(OrganizationMembers);
  });

router
  .route("/OrganizationMembers/:id")
  .get(async (req, res) => {
    const OrganizationMembers = await prisma.organizationMembers
      .findUnique({
        where: {
          id: req.params.id,
        },
        include: {
          member: false,
          organization: true,
        },
      })
      .catch(handleError(res));

    if (!OrganizationMembers) return;
    res.json(OrganizationMembers);
  })
  .put(async (req, res) => {
    const OrganizationMembers = await prisma.organizationMembers
      .update({
        where: {
          id: req.params.id,
        },
        data: req.body,
      })
      .catch(handleError(res));

    if (!OrganizationMembers) return;

    res.json(OrganizationMembers);
  })
  .delete(async (req, res) => {
    const OrganizationMembers = await prisma.organizationMembers
      .delete({
        where: {
          id: req.params.id,
        },
      })
      .catch(handleError(res));

    if (!OrganizationMembers) return;

    res.json(OrganizationMembers);
  });

export default router;

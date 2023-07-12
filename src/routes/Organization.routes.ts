import { Router } from "express";
import handleError from "../errorHadler";
import prisma from "../dao/connection"

const router = Router();

router
  .route("/Organization")
  .get(async (req, res) => {
    const Organizations = await prisma.organization.findMany().catch(handleError(res));
    if (!Organizations) return;

    if (Organizations.length === 0) {
      res.status(404).send("No Organization found");
      return;
    }

    res.json(Organizations);
  })
  .post(async (req, res) => {
    const Organization = await prisma.organization.create({
      data: req.body,
    }).catch(handleError(res));

    if (!Organization) return;

    res.json(Organization);
  });

router
  .route("/Organization/:id")
  .get(async (req, res) => {
    const Organization = await prisma.organization.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        owner: true,
        projects: true,
        OrganizationMembers: false
      }
    }).catch(handleError(res));

    if (!Organization) return;
    res.json(Organization);
  })
  .put(async (req, res) => {
    const Organization = await prisma.organization.update({
      where: {
        id: req.params.id,
      },
      data: req.body,
    }).catch(handleError(res));

    if (!Organization) return;

    res.json(Organization);
  })
  .delete(async (req, res) => {
    const Organization = await prisma.organization.delete({
      where: {
        id: req.params.id,
      },
    }).catch(handleError(res));

    if (!Organization) return;

    res.json(Organization);
  });

export default router;

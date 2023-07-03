import { Router } from "express";
import handleError from "../errorHadler";
import prisma from "../dao/connection";

const router = Router();

router
  .route("/attachment")
  .get(async (req, res) => {
    const attachments = await prisma.attachment
      .findMany()
      .catch(handleError(res));
    if (!attachments) return;

    if (attachments.length === 0) {
      res.status(404).send("No attachment found");
      return;
    }

    res.json(attachments);
  })
  .post(async (req, res) => {
    const attachment = await prisma.attachment
      .create({
        data: req.body,
      })
      .catch(handleError(res));

    if (!attachment) return;

    res.json(attachment);
  });

router
  .route("/attachment/:id")
  .get(async (req, res) => {
    const attachment = await prisma.attachment
      .findUnique({
        where: {
          id: req.params.id,
        },
      })
      .catch(handleError(res));

    if (!attachment) return;
    res.json(attachment);
  })
  .put(async (req, res) => {
    const attachment = await prisma.attachment
      .update({
        where: {
          id: req.params.id,
        },
        data: req.body,
      })
      .catch(handleError(res));

    if (!attachment) return;

    res.json(attachment);
  })
  .delete(async (req, res) => {
    const attachment = await prisma.attachment
      .delete({
        where: {
          id: req.params.id,
        },
      })
      .catch(handleError(res));

    if (!attachment) return;

    res.json(attachment);
  });

export default router;

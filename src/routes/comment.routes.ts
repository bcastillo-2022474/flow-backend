import { Router } from "express";
import handleError from "../errorHadler";
import prisma from "../dao/connection"

const router = Router();

router
  .route("/comment")
  .get(async (req, res) => {
    const comments = await prisma.comment.findMany().catch(handleError(res));
    if (!comments) return;

    if (comments.length === 0) {
      res.status(404).send("No comment found");
      return;
    }

    res.json(comments);
  })
  .post(async (req, res) => {
    const comment = await prisma.comment.create({
      data: req.body,
    }).catch(handleError(res));

    if (!comment) return;

    res.json(comment);
  });

router
  .route("/comment/:id")
  .get(async (req, res) => {
    const comment = await prisma.comment.findUnique({
      where: {
        id: req.params.id,
      },
    }).catch(handleError(res));

    if (!comment) return;
    res.json(comment);
  })
  .put(async (req, res) => {
    const comment = await prisma.comment.update({
      where: {
        id: req.params.id,
      },
      data: req.body,
    }).catch(handleError(res));

    if (!comment) return;

    res.json(comment);
  })
  .delete(async (req, res) => {
    const comment = await prisma.comment.delete({
      where: {
        id: req.params.id,
      },
    }).catch(handleError(res));

    if (!comment) return;

    res.json(comment);
  });

export default router;
  
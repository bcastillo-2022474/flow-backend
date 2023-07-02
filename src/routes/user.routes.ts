import {Router} from "express";
import handleError from "../errorHadler";
import prisma from "../dao/connection"

const router = Router();

router
    .route("/user")
    .get(async (req, res) => {
        const users = await prisma.user.findMany().catch(handleError(res));
        if (!users) return;

        if (users.length === 0) {
            res.status(404).send("No user found");
            return;
        }

        res.json(users);
    })
    .post(async (req, res) => {
        const user = await prisma.user.create({
            data: req.body,
        }).catch(handleError(res));

        if (!user) return;

        console.log(user)
        res.json(user);
    });

router
    .route("/user/:id")
    .get(async (req, res) => {
        const user = await prisma.user.findUnique({
            where: {
                id: req.params.id,
            },
        }).catch(handleError(res));

        if (!user) return;
        res.json(user);
    })
    .put(async (req, res) => {
        const user = await prisma.user.update({
            where: {
                id: req.params.id,
            },
            data: req.body,
        }).catch(handleError(res));

        if (!user) return;

        res.json(user);
    })
    .delete(async (req, res) => {
        const user = await prisma.user.delete({
            where: {
                id: req.params.id,
            },
        }).catch(handleError(res));

        if (!user) return;

        res.json(user);
    });

export default router;
  
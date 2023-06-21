import {Router} from "express";
import prisma from "../dao/connection";

const router = Router();

router
    .route("/user")
    .get(async (req, res) => {
        const users = await prisma.user.findMany().catch((err) => {
            res.status(500).send(err);
            return null;
        });
        if (!users) return;
        if (users.length === 0) {
            res.status(404).send("No users found");
        }
        res.json(users);
    })
    .post(async (req, res) => {
        const user = await prisma.user
            .create({
                data: req.body,
            })
            .catch((err) => {
                res.status(500).send(err);
                return null;
            });
        if (!user) return;

        res.json(user);
    });

router
    .route("/user/:id")
    .put(async (req, res) => {
        const user = await prisma.user
            .update({
                data: req.body,
                where: {
                    id: req.params.id,
                },
            })
            .catch((err) => {
                res.status(500).send(err);
                return null;
            });
        if (!user) return;

        res.json(user);
    })
    .get((req, res) => {
        const user = prisma.user
            .findUnique({
                where: {
                    id: req.params.id,
                },
            })
            .catch((err) => {
                res.status(500).send(err);
                return null;
            });

        if (!user) return;

        res.json(user);
    })
    .delete((req, res) => {
        const user = prisma.user
            .delete({
                where: {
                    id: req.params.id,
                },
            })
            .catch((err) => {
                res.status(500).send(err);
            });

        if (!user) return;

        res.json(user);
    });

export default router;

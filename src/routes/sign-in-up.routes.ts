import Router, { Response } from "express";
import { User } from "@prisma/client";
import prisma from "../dao/connection";
import generateAccessToken from "../functions/generateAccessToken";

const router = Router();
const setJWTOnCookie = (res: Response, user: User) => {
  const expireTime = 1000 * 60 * 60; // 1 hour
  // Set the token as an HTTP-only cookie
  res.cookie("access_token", generateAccessToken(user), {
    httpOnly: true,
    // secure: true, // Enable this if using HTTPS
    sameSite: "strict", // Adjust this based on your requirements
    expires: new Date(Date.now() + expireTime), // Set the cookie expiration time, adjust as needed
    path: "/", // Set the path where the cookie is valid, adjust as needed
  });
};

router.post("/sign-in", async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  });
  if (!user) return res.sendStatus(404);
  if (user.password !== req.body.password) return res.sendStatus(401);

  setJWTOnCookie(res, user);

  return res.json({
    user,
  });
});

router.post("/sign-up", async (req, res) => {
  const user = await prisma.user.create({
    data: {
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    },
  });

  setJWTOnCookie(res, user);

  return res.json({
    user,
  });
});

export default router;

import express from "express";
import userRouter from "./routes/user.routes";

const app = express();

app.use("/api", (req, res, next) => {
  console.log("ITS WORKINg");
  next();
});
app.use("/api", userRouter);

app.get("**", (_, res) => {
  res.send("HWATTTTTTTT");
});
app.listen(3000, () => console.log("Server UP"));

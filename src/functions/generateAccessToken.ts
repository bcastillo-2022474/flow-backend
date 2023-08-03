import jwt from "jsonwebtoken";

function generateAccessToken(username: object) {
  if (!process.env.SECRET) throw new Error("No secret");
  return jwt.sign(username, process.env.SECRET, { expiresIn: "1800s" });
}

export default generateAccessToken;

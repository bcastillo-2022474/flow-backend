import { Response } from "express";

const handleError = (res: Response) => (err: any) => {
  console.log(err);
  res.status(500).send(err);
  return null;
};

export default handleError;

import * as jwt from "jsonwebtoken";
import { jwtSecret } from "../configs";

export const signToken = (payload: {}) => {
  return jwt.sign(payload, jwtSecret, {
    expiresIn: "30d",
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, jwtSecret);
};

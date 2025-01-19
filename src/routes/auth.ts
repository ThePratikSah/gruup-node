import { Router } from "express";
import { compareHash, hashString } from "../helpers/crypt";
import { findUserByEmail, registerNewUser } from "../helpers/query";
import { Prisma } from "@prisma/client";
import { validateData } from "../middleware/dataValidator";
import { addNewUserSchema } from "../validator/validator";
import { signToken } from "../helpers/jwt";

export const authRouter = Router();

authRouter.post("/login", async (req, res) => {
  const { email = "", password = "" } = req.body as {
    email: string;
    password: string;
  };
  const user = await findUserByEmail(email);

  if (!user) {
    return res.status(404).json({ message: "user or password is invalid" });
  }

  if (!user.password) {
    return res
      .status(404)
      .json({ message: "user created without password, contact admin" });
  }

  const { password: userPassword, ...userData } = user;

  if (!(await compareHash(password, userPassword!))) {
    return res.status(404).json({ message: "user or password is invalid" });
  }

  return res
    .status(200)
    .json({ message: "login successful", token: signToken(userData) });
});

authRouter.post(
  "/register",
  validateData(addNewUserSchema, "body"),
  async (req, res) => {
    const {
      name = "",
      email,
      password,
    } = req.body as {
      name: string;
      email: string;
      password: string;
    };

    const hashedPassword = await hashString(password!);
    const newUser = await registerNewUser({
      email,
      name,
      password: hashedPassword,
    });
    res.status(201).json({ message: "User registered successfully", newUser });
  }
);

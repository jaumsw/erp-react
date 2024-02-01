import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();
const authRouter = Router();

authRouter.post("/register", async (req: Request, res: Response) => {
  try {
    const { username, fullname, email, password } = req.body;

    const user = await prisma.user.create({
      data: {
        username,
        fullname,
        email,
        password,
      },
    });

    res.status(201).json({ user });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

authRouter.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || "your-secret-key");

    res.json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Adicione outras rotas conforme necessário

export default authRouter;

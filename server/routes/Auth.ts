import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();
const authRouter = Router();

authRouter.post("/auth", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || password !== password) {
      return res.status(401).json({ message: "Credenciais invalidas" });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      if(user.password === password) {
        const expiresIn = 60 * 60;

        const token = jwt.sign({ user }, user.password, { expiresIn });
        console.log(token)
        res.status(200).json({
          token: `${token}`,
          user: {
            id: user.id,
            username: user.username,
            fullname: user.fullname,
            email: user.email,
            admin: user.admin
          },
        });
      } else{
        res.status(401).json({ message: "Credenciais invalidas" });
      }
    } else {
      res.status(401).json({ message: "Credenciais invalidas" });
    }
  } catch (error) {
    console.error("Erro de autenticação:", error);
    res.status(500).json({ message: "Erro de autenticação" });
  }
});

export default authRouter;

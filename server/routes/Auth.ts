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

  if(user){

    const expiresIn = 60 * 60; 

    const token = jwt.sign({ user }, user.password, { expiresIn });

    res.status(200).json({
      token: `${token}`,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } else{
    res.status(401).json({ message: "Credenciais invalidas" });
  }
  } catch (error) {
    console.error("Erro de autenticação:", error);
    res.status(500).json({ message: "Erro de autenticação" });
  }
});

// Adicione outras rotas conforme necessário

export default authRouter;

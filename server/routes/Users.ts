import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const usersRouter = Router();

usersRouter.get("/user", async (req: Request, res: Response) => {
    try {
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader) {
            return res.status(401).json({ message: "Token invalido" });
        }

        const token = authorizationHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Token invalido" });
        }
        const data = jwt.decode(token);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: "Erro de buscar dados do usuario" });

    }
})

usersRouter.get("/users", async (req: Request, res: Response) => {
    try {
        const authorizationToken = req.headers.authorization;
        if (!authorizationToken) {
            return res.status(401).json({ message: "Token invalido" });
        }
        const users = await prisma.user.findMany();
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
})

usersRouter.get("/users/:userId", async (req: Request, res: Response) => {
    try {
        const authorizationToken = req.headers.authorization;
        if (!authorizationToken) {
            return res.status(401).json({ message: "Token invalido" });
        }
        const { userId } = req.params;
        const user = await prisma.user.findUnique({ where: { id: parseInt(userId) } });
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
})

usersRouter.post("/users", async (req: Request, res: Response) => {
    try {
        const { username, fullname, email, password, admin } = req.body;

        const user = await prisma.user.create({
            data: {
                username,
                fullname,
                email,
                password,
                admin
            },
        });

        res.status(201).json({ user });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default usersRouter
import { Response,Request, Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const leadsRouter = Router();

leadsRouter.post("/leads", async (req: Request, res: Response) => {
    try {
        const authorizationToken = req.headers.authorization;
        if(!authorizationToken){
            return res.status(401).json({ message: "Token invalido" });
        }
        const { name, email,data, contato, origem_lead, categoria, consultor, status} = req.body;
        const lead = await prisma.leads.create({
            data: {
                name,
                email,
                data,
                contato,
                origem_lead,
                categoria,
                consultor,
                status
            },
        })
        res.status(201).json({ lead });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
})

leadsRouter.get("/leads", async (req: Request, res: Response) => {
    try {
        const authorizationToken = req.headers.authorization;
        if(!authorizationToken){
            return res.status(401).json({ message: "Token invalido" });
        }
        const leads = await prisma.leads.findMany();        
        res.status(201).json({ leads });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
})

export default leadsRouter
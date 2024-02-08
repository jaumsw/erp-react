import express from 'express';
import cors from 'cors';
import path from 'node:path'
import authRouter from '../routes/Auth';
import leadsRouter from '../routes/Leads';

const app = express();
app.use(express.static(path.join(__dirname, '../../build')));

const PORT = process.env.PORT || 8099;

app.use(express.json())
app.use(cors())

app.use("/api", authRouter);
app.use("/api", leadsRouter);

app.listen(PORT, () => console.log(`Server está rodando na porta: ${PORT}`))
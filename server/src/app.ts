import express from 'express';
import cors from 'cors';
import path from 'node:path'

const app = express();
app.use(express.static(path.join(__dirname, '../../build')));

const PORT = process.env.PORT || 8000;

app.use(express.json())
app.use(cors())

app.listen(PORT, () => console.log(`Server está rodando na porta: ${PORT}`))
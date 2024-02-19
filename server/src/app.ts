import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';

const app = express();
app.use(express.static(path.join(__dirname, '../../build')));

const PORT = process.env.PORT || 8099;

app.use(express.json());
app.use(cors());

// Importa dinamicamente todas as rotas da pasta 'routes'
const routesPath = path.join(__dirname, '../routes');
fs.readdirSync(routesPath).forEach(file => {
  if (file.endsWith('.ts')) {
    const route = require(path.join(routesPath, file)).default;
    app.use('/api', route);
  }
});

app.listen(PORT, () => console.log(`Server está rodando na porta: ${PORT}`));

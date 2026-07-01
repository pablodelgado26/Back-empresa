import express from "express";
import { config } from "dotenv";
import cors from "cors"; // Importa o middleware CORS

import router from "./routes/index.routes.js";

config(); // Carrega variáveis de ambiente do arquivo .env
const port = process.env.PORT || 4001; // Define a porta do servidor

// Inicializa o Express
const app = express();
app.use(cors()); // Habilita CORS para todas as rotas

app.use(express.json({ limit: '10mb' })); // Parse de JSON com limite para imagens comprimidas
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use("/", router)

app.use((error, req, res, next) => {
  if (error?.type === 'entity.too.large') {
    return res.status(413).json({ error: 'Payload muito grande. Reduza as imagens ou o tamanho da requisição.' });
  }

  return next(error);
});


// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

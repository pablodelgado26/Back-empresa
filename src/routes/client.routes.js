import express from "express";
import clientController from "../controllers/clientController.js";

const clientRouter = express.Router();

// Rotas de Clientes
// GET /clientes - Listar todos os Clientes
clientRouter.get("/", clientController.getAllClients);

// GET /clientes/:id - Obter um Cliente pelo ID
clientRouter.get("/:id", clientController.getClientById);

// POST /clientes - Criar um novo Cliente
clientRouter.post("/", clientController.createClient);

// PUT /clientes/:id - Atualizar um Cliente existente
clientRouter.put("/:id", clientController.updateClient);

// DELETE /clientes/:id - Remover um Cliente
clientRouter.delete("/:id", clientController.deleteClient);

export default clientRouter;

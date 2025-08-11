import express from "express";
import clientController from "../controllers/clientController.js";

const clientRouter = express.Router();

// Rotas de Clientes
// GET /clients - Listar todos os Clientes
clientRouter.get("/", clientController.getAllClients);

// GET /clients/:id - Obter um Cliente pelo ID
clientRouter.get("/:id", clientController.getClientById);

// POST /clients - Criar um novo Cliente
clientRouter.post("/", clientController.createClient);

// PUT /clients/:id - Atualizar um Cliente existente
clientRouter.put("/:id", clientController.updateClient);

// DELETE /clients/:id - Remover um Cliente
clientRouter.delete("/:id", clientController.deleteClient);

export default clientRouter;

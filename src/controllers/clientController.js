import ClientModel from "../models/clientModel.js";

class ClientController {
  // GET /clients
  async getAllClients(req, res) {
    const name = req.query.name;
    const email = req.query.email;
    const cpf = req.query.cpf;
    const pagina = req.query.pagina || 1;
    const limite = req.query.limite || 10;
    
    try {
      const clientes = await ClientModel.findAll(name, email, cpf, pagina, limite);
      res.json(clientes);
    } catch (error) {
      console.error("Erro ao buscar os clientes:", error);
      res.status(500).json({ error: "Erro ao buscar os clientes" });
    }
  }

  // GET /clients/:id
  async getClientById(req, res) {
    try {
      const { id } = req.params;

      const cliente = await ClientModel.findById(id);

      if (!cliente) {
        return res.status(404).json({ error: "Cliente não encontrado!" });
      }

      res.json(cliente);
    } catch (error) {
      console.error("Erro ao buscar cliente:", error);
      res.status(500).json({ error: "Erro ao buscar cliente!" });
    }
  }

  // POST /clients
  async createClient(req, res) {
    try {
      // Captura dos dados do corpo da requisição (frontend)
      const {
        name,
        email,
        endereco,
        dataNascimento,
        CPF,
        proximoAgendamento,
        descricao,
        fotoAntes,
        fotoDepois,
      } = req.body;

      // Verifica se todos os campos obrigatórios foram fornecidos
      if (!name || !email || !endereco || !dataNascimento || !CPF) {
        return res.status(400).json({
          error: "Os campos nome, email, endereço, data de nascimento e CPF são obrigatórios",
        });
      }

      // Criar o novo Cliente
      const newClient = await ClientModel.create(
        name,
        email,
        endereco,
        dataNascimento,
        CPF,
        proximoAgendamento,
        descricao,
        fotoAntes,
        fotoDepois
      );

      if (!newClient) {
        return res.status(400).json({ error: "Erro ao criar cliente" });
      }

      res.status(201).json({
        message: "Cliente criado com sucesso",
        cliente: newClient,
      });
    } catch (error) {
      console.error("Erro ao criar Cliente:", error);
      res.status(500).json({ error: "Erro ao criar Cliente" });
    }
  }

  // PUT /clients/:id
  async updateClient(req, res) {
    try {
      const { id } = req.params;
      const {
        name,
        email,
        endereco,
        dataNascimento,
        CPF,
        proximoAgendamento,
        descricao,
        fotoAntes,
        fotoDepois,
      } = req.body;

      // Atualizar o Cliente
      const updatedClient = await ClientModel.update(
        id,
        name,
        email,
        endereco,
        dataNascimento,
        CPF,
        proximoAgendamento,
        descricao,
        fotoAntes,
        fotoDepois
      );

      if (!updatedClient) {
        return res.status(404).json({ error: "Cliente não encontrado" });
      }

      res.json({
        message: "Cliente atualizado com sucesso",
        cliente: updatedClient,
      });
    } catch (error) {
      console.error("Erro ao atualizar Cliente:", error);
      res.status(500).json({ error: "Erro ao atualizar Cliente!" });
    }
  }

  // DELETE /clients/:id
  async deleteClient(req, res) {
    try {
      const { id } = req.params;

      // Remover o Cliente
      const result = await ClientModel.delete(id);

      if (!result) {
        return res.status(404).json({ error: "Cliente não encontrado!" });
      }

      res.status(200).json({
        message: "Cliente removido com sucesso",
      });
    } catch (error) {
      console.error("Erro ao remover Cliente:", error);
      res.status(500).json({ error: "Erro ao remover Cliente!" });
    }
  }
}

export default new ClientController();
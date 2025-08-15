import prisma from "../../prisma/prisma.js";

class ClientModel {
  // Obter todos os clientes
  async findAll(name, email, cpf, pagina, limite) {
    
    if(Number(limite) < 1 || Number(limite) > 100) {
      limite = 10;
    }
    
    if (Number(pagina) < 1) {
      pagina = 1;
    }

    const where = {};

    const skip = (Number(pagina) - 1) * Number(limite);

    if (name) {
      where.name = {
        contains: name,
      };
    }

    if (email) {
      where.email = {
        contains: email,
      };
    }

    if (cpf) {
      where.CPF = cpf;
    }

    const clientes = await prisma.client.findMany({
      skip,
      take: Number(limite),
      where,
      orderBy: {
        createdAt: "desc",
      },
    });

    const totalExibidos = clientes.length;
    const totalGeral = await prisma.client.count({
      where,
    });

    return { totalExibidos, totalGeral, clientes };
  }

  // Obter um cliente pelo ID
  async findById(id) {
    const cliente = await prisma.client.findUnique({
      where: {
        id: Number(id),
      },
    });

    return cliente;
  }

  // Obter um cliente pelo email (para autenticação)
  async findByEmail(email) {
    const cliente = await prisma.client.findFirst({
      where: {
        email: email,
      },
    });

    return cliente;
  }

  // Criar um novo cliente
  async create(
    name,
    email,
    endereco,
    dataNascimento,
    CPF,
    proximoAgendamento,
    descricao,
    fotoAntes,
    fotoDepois,
    dataRegistro
  ) {
    const novoCliente = await prisma.client.create({
      data: {
        name,
        email,
        endereco,
        dataNascimento: new Date(dataNascimento),
        CPF,
        proximoAgendamento: proximoAgendamento ? new Date(proximoAgendamento) : null,
        descricao,
        fotoAntes: fotoAntes || [],
        fotoDepois: fotoDepois || [],
        dataRegistro: new Date(dataRegistro),
      },
    });

    return novoCliente;
  }

  // Atualizar um cliente
  async update(
    id,
    name,
    email,
    endereco,
    dataNascimento,
    CPF,
    proximoAgendamento,
    descricao,
    fotoAntes,
    fotoDepois,
    dataRegistro
  ) {
    const cliente = await this.findById(id);

    if (!cliente) {
      return null;
    }

    const dataToUpdate = {};
    
    if (name !== undefined) dataToUpdate.name = name;
    if (email !== undefined) dataToUpdate.email = email;
    if (endereco !== undefined) dataToUpdate.endereco = endereco;
    if (dataNascimento !== undefined) dataToUpdate.dataNascimento = new Date(dataNascimento);
    if (CPF !== undefined) dataToUpdate.CPF = CPF;
    if (proximoAgendamento !== undefined) dataToUpdate.proximoAgendamento = proximoAgendamento ? new Date(proximoAgendamento) : null;
    if (descricao !== undefined) dataToUpdate.descricao = descricao;
    if (fotoAntes !== undefined) dataToUpdate.fotoAntes = fotoAntes || [];
    if (fotoDepois !== undefined) dataToUpdate.fotoDepois = fotoDepois || [];
    if (dataRegistro !== undefined) dataToUpdate.dataRegistro = new Date(dataRegistro);

    const clienteAtualizado = await prisma.client.update({
      where: {
        id: Number(id),
      },
      data: dataToUpdate,
    });

    return clienteAtualizado;
  }

  // Remover um cliente
  async delete(id) {
    const cliente = await this.findById(id);

    if (!cliente) {
      return null;
    }

    await prisma.client.delete({
      where: {
        id: Number(id),
      },
    });

    return true;
  }
}

export default new ClientModel();
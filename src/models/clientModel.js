import prisma from "../../prisma/prisma.js";

const normalizeDateInput = (value, keepUndefined = true) => {
  if (value === undefined) {
    return keepUndefined ? undefined : null;
  }

  if (value === null || value === '') {
    return keepUndefined ? undefined : null;
  }

  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return new Date(`${value}T12:00:00.000Z`);
  }

  const parsedDate = new Date(value);
  return Number.isNaN(parsedDate.getTime()) ? undefined : parsedDate;
};

class ClientModel {
  // Obter todos os clientes
  async findAll(name, email, cpf, pagina, limite) {

    if (Number(limite) < 1 || Number(limite) > 100) {
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
    const dataNascimentoDate = normalizeDateInput(dataNascimento, false);
    const proximoAgendamentoDate = normalizeDateInput(proximoAgendamento, false);
    const dataRegistroDate = normalizeDateInput(dataRegistro, false);

    if (!dataNascimentoDate || !dataRegistroDate) {
      throw new Error('Datas obrigatórias inválidas');
    }

    const novoCliente = await prisma.client.create({
      data: {
        name,
        email,
        endereco,
        dataNascimento: dataNascimentoDate,
        CPF,
        proximoAgendamento: proximoAgendamentoDate || null,
        descricao,
        fotoAntes: fotoAntes || [],
        fotoDepois: fotoDepois || [],
        dataRegistro: dataRegistroDate,
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

    if (name?.trim()) dataToUpdate.name = name.trim();
    if (email?.trim()) dataToUpdate.email = email.trim();
    if (endereco?.trim()) dataToUpdate.endereco = endereco.trim();

    const normalizedBirthDate = normalizeDateInput(dataNascimento);
    if (normalizedBirthDate) dataToUpdate.dataNascimento = normalizedBirthDate;

    if (CPF?.trim()) dataToUpdate.CPF = CPF.trim();

    const normalizedAppointmentDate = normalizeDateInput(proximoAgendamento, false);
    if (normalizedAppointmentDate !== undefined) dataToUpdate.proximoAgendamento = normalizedAppointmentDate;

    if (descricao !== undefined && descricao !== null) dataToUpdate.descricao = descricao;
    if (Array.isArray(fotoAntes)) dataToUpdate.fotoAntes = fotoAntes;
    if (Array.isArray(fotoDepois)) dataToUpdate.fotoDepois = fotoDepois;

    const normalizedRegistrationDate = normalizeDateInput(dataRegistro);
    if (normalizedRegistrationDate) dataToUpdate.dataRegistro = normalizedRegistrationDate;

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
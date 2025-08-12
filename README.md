# Sr. Frio - API de Gestão de Clientes

API REST para gestão de clientes da empresa Sr. Frio, especializada em serviços de refrigeração, ar-condicionado e climatização.

## 🌡️ Sobre o Projeto

A API Sr. Frio é um sistema completo para gerenciar clientes de uma empresa de refrigeração, permitindo o controle de:

- **Clientes**: Cadastro completo com dados pessoais e histórico de serviços
- **Agendamentos**: Controle de próximos atendimentos
- **Tipos de Serviço**: Instalação, manutenção e reparo
- **Equipamentos**: Histórico de equipamentos por cliente
- **Documentação Visual**: Fotos antes e depois dos serviços
- **Usuários**: Sistema de autenticação para funcionários

## 🚀 Tecnologias

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **Prisma** - ORM para banco de dados
- **PostgreSQL** - Banco de dados relacional
- **JWT** - Autenticação via tokens
- **bcryptjs** - Criptografia de senhas
- **Docker** - Containerização

## 📋 Funcionalidades

### Gestão de Clientes
- ✅ Cadastro de novos clientes
- ✅ Listagem com filtros (nome, email, CPF)
- ✅ Busca por ID
- ✅ Atualização de dados
- ✅ Remoção de clientes
- ✅ Paginação de resultados
- ✅ Controle de status (ativo/inativo)

### Tipos de Serviço
- 🔧 **Instalação** - Instalação de novos equipamentos
- 🛠️ **Manutenção** - Manutenção preventiva e corretiva
- 🔨 **Reparo** - Conserto de equipamentos

### Autenticação
- ✅ Registro de usuários
- ✅ Login com JWT
- ✅ Middleware de autenticação
- ✅ Controle de roles (admin, técnico, atendente)

## 🏗️ Estrutura do Projeto

```
src/
├── controllers/          # Controladores da aplicação
│   ├── authController.js  # Autenticação e usuários
│   └── clientController.js # Gestão de clientes
├── middleware/           # Middlewares
│   └── authMiddleware.js  # Verificação de autenticação
├── models/              # Modelos de dados
│   ├── clientModel.js    # Modelo de clientes
│   └── userModel.js      # Modelo de usuários
├── routes/              # Definição de rotas
│   ├── auth.routes.js    # Rotas de autenticação
│   ├── client.routes.js  # Rotas de clientes
│   └── index.routes.js   # Agregador de rotas
└── server.js            # Arquivo principal
```

## 🛠️ Instalação

### Pré-requisitos
- Node.js 18+
- PostgreSQL 13+
- Docker (opcional)

### Instalação Local

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd Back-empresa
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
```

Edite o arquivo `.env`:
```env
PORT=4000
DATABASE_URL="postgresql://sr_frio_user:srfrio2025@localhost:5432/sr_frio_db"
JWT_SECRET="srFrioJWT2025!@#"
```

4. **Configure o banco de dados**
```bash
npx prisma migrate dev
npx prisma generate
```

5. **Inicie o servidor**
```bash
npm run dev
```

### Instalação com Docker

```bash
docker-compose up -d
```

## 📡 API Endpoints

### Base URL
```
http://localhost:4000/api
```

### Autenticação

#### POST `/api/auth/register`
Registra um novo usuário
```json
{
  "name": "João Silva",
  "email": "joao@srfrio.com",
  "password": "senha123",
  "role": "tecnico"
}
```

#### POST `/api/auth/login`
Realiza login
```json
{
  "email": "joao@srfrio.com",
  "password": "senha123"
}
```

### Clientes (Rotas Protegidas)

#### GET `/api/clients`
Lista clientes com filtros opcionais
```
GET /api/clients?name=João&email=joao@&cpf=123&pagina=1&limite=10
```

#### GET `/api/clients/:id`
Busca cliente por ID

#### POST `/api/clients`
Cria novo cliente
```json
{
  "name": "Maria Santos",
  "email": "maria@email.com",
  "telefone": "(11) 99999-9999",
  "endereco": "Rua das Flores, 123",
  "dataNascimento": "1990-05-15",
  "CPF": "123.456.789-00",
  "tipoServico": "instalação",
  "proximoAgendamento": "2025-08-15T10:00:00Z",
  "equipamentos": ["Ar Split 12000 BTUs"],
  "observacoes": "Cliente prefere atendimento manhã"
}
```

#### PUT `/api/clients/:id`
Atualiza cliente existente

#### DELETE `/api/clients/:id`
Remove cliente

## 🗄️ Modelo de Dados

### Cliente
```javascript
{
  id: Number,
  name: String,
  email: String (único),
  telefone: String,
  endereco: String,
  dataNascimento: DateTime,
  CPF: String (único),
  proximoAgendamento: DateTime (opcional),
  tipoServico: String, // "instalação", "manutenção", "reparo"
  descricao: String (opcional),
  fotoAntes: String[], // URLs das fotos
  fotoDepois: String[], // URLs das fotos
  equipamentos: String[], // Lista de equipamentos
  observacoes: String (opcional),
  status: String, // "ativo", "inativo"
  createdAt: DateTime,
  updatedAt: DateTime
}
```

### Usuário
```javascript
{
  id: Number,
  name: String,
  email: String (único),
  password: String (hash),
  role: String, // "admin", "tecnico", "atendente"
  createdAt: DateTime,
  updatedAt: DateTime
}
```

## 🔐 Autenticação

A API utiliza JWT (JSON Web Tokens) para autenticação. Inclua o token no header:

```
Authorization: Bearer <seu-jwt-token>
```

## 🐳 Docker

O projeto inclui configuração Docker com:
- Container da aplicação Node.js
- Container PostgreSQL
- Volumes para persistência de dados

## 📝 Logs e Monitoramento

- Logs estruturados no console
- Tratamento de erros centralizado
- Validações de entrada de dados

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para detalhes.

## 📞 Contato

Sr. Frio - Soluções em Refrigeração
- 📧 Email: contato@srfrio.com
- 🌐 Website: www.srfrio.com
- 📱 Telefone: (11) 99999-9999

---

Desenvolvido com ❄️ pela equipe Sr. Frio

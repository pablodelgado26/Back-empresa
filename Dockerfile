# Use Node.js 18 Alpine como base (mais leve)
FROM node:18-alpine

# Instalar dependências do sistema necessárias para o Prisma
RUN apk add --no-cache openssl

# Criar diretório da aplicação
WORKDIR /app

# Copiar package.json e package-lock.json (se existir)
COPY package*.json ./

# Instalar dependências
RUN npm ci --only=production && npm cache clean --force

# Copiar o código da aplicação
COPY . .

# Gerar o Prisma Client
RUN npx prisma generate

# Criar usuário não-root para segurança
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Mudar ownership dos arquivos para o usuário nodejs
RUN chown -R nodejs:nodejs /app
USER nodejs

# Expor a porta da aplicação
EXPOSE 4000

# Comando para executar as migrações e iniciar a aplicação
CMD ["sh", "-c", "npx prisma migrate deploy && node src/server.js"]

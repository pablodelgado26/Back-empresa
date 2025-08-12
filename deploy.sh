#!/bin/bash

# Script de deploy para VPS
echo "🚀 Iniciando deploy da aplicação..."

# Parar containers existentes
echo "⏹️  Parando containers existentes..."
docker-compose -f docker-compose.prod.yml down

# Fazer backup do banco (opcional)
echo "💾 Fazendo backup do banco..."
mkdir -p backups
docker-compose -f docker-compose.prod.yml exec postgres pg_dump -U empresa_user empresa_db > backups/backup_$(date +%Y%m%d_%H%M%S).sql

# Rebuild das imagens
echo "🔨 Fazendo rebuild das imagens..."
docker-compose -f docker-compose.prod.yml build --no-cache

# Subir os serviços
echo "▶️  Subindo os serviços..."
docker-compose -f docker-compose.prod.yml up -d

# Verificar se está funcionando
echo "🔍 Verificando status dos containers..."
docker-compose -f docker-compose.prod.yml ps

# Aguardar um momento e testar a API
sleep 10
echo "🧪 Testando a API..."
curl -f http://localhost:4000/auth || echo "❌ API não está respondendo"

echo "✅ Deploy finalizado!"
echo "📊 Para ver os logs: docker-compose -f docker-compose.prod.yml logs -f"
echo "🔍 Para monitorar: docker-compose -f docker-compose.prod.yml ps"

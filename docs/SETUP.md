# 🚀 Setup do Projeto

## 📋 Pré-requisitos

- Node.js 18+
- Docker (opcional, para banco de dados)

## 🔧 Instalação

```bash
# Clone o repositório
git clone https://github.com/Adyllsxn/xBiolo.git
cd xBiolo

# Instale as dependências do backend
cd apps/backend
npm install

# Instale as dependências do frontend
cd ../frontend
npm install

# Volte para a raiz
cd ../..
```
---

## 📦 Migrations
> Configure um banco PostgreSQL local e atualize a URL no .env

```bash
cd apps/backend
npx prisma generate
npx prisma migrate dev
```

## 🌱 Seed (Dados Iniciais)
> Popula o banco com dados de exemplo

```bash
cd apps/backend
npx prisma db seed
```
> O que o seed cria:

```bash
✅ Usuário admin (admin@xbiolo.ao / admin123)
✅ Store (configurações da loja)
```

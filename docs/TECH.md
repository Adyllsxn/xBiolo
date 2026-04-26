# 🛠️ Tecnologias

<div align="center">
  <img src="./assets/tech-stack.svg" alt="Stack Tecnológica" width="80%" />
</div>

---

## 📋 Índice

- [Backend](#backend)
- [Frontend](#frontend)
- [Banco de Dados](#banco-de-dados)
- [DevOps & Ferramentas](#devops--ferramentas)
- [Bibliotecas e Pacotes](#bibliotecas-e-pacotes)
- [Por que essas tecnologias?](#por-que-essas-tecnologias)

---

## 🖥️ Backend

| Tecnologia | Versão | Descrição |
|------------|--------|------------|
| ![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=flat-square&logo=nestjs&logoColor=white) | 10.x | Framework Node.js progressivo com arquitetura modular |
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white) | 18.x | Runtime JavaScript no servidor |
| ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white) | 5.x | Tipagem estática para JavaScript |
| ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white) | 5.x | ORM moderno e type-safe |
| ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat-square&logo=postgresql&logoColor=white) | 15.x | Banco de dados relacional |
| ![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white) | 9.x | Autenticação segura baseada em tokens |
| ![BCrypt](https://img.shields.io/badge/BCrypt-525252?style=flat-square&logo=security&logoColor=white) | 5.x | Hashing de senhas |
| ![Class Validator](https://img.shields.io/badge/Class%20Validator-6B46C1?style=flat-square) | 0.14.x | Validação de DTOs |
| ![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=flat-square&logo=swagger&logoColor=black) | 7.x | Documentação da API |

---

## 🎨 Frontend

| Tecnologia | Versão | Descrição |
|------------|--------|------------|
| ![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white) | 14.x | React framework com App Router |
| ![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black) | 18.x | Biblioteca para interfaces de usuário |
| ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white) | 5.x | Tipagem estática |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white) | 3.x | Framework CSS utility-first |
| ![shadcn/ui](https://img.shields.io/badge/shadcn/ui-000000?style=flat-square&logo=shadcnui&logoColor=white) | Latest | Componentes acessíveis e customizáveis |
| ![Recharts](https://img.shields.io/badge/Recharts-22B5BF?style=flat-square&logo=chart&logoColor=white) | 2.x | Biblioteca de gráficos |
| ![Framer Motion](https://img.shields.io/badge/Framer%20Motion-0055FF?style=flat-square&logo=framer&logoColor=white) | 10.x | Animações suaves |
| ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white) | 1.x | Cliente HTTP |
| ![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-EC5990?style=flat-square&logo=reacthookform&logoColor=white) | 7.x | Gerenciamento de formulários |
| ![Zod](https://img.shields.io/badge/Zod-3E67B1?style=flat-square&logo=zod&logoColor=white) | 3.x | Validação de schemas |

---

## 🗄️ Banco de Dados

| Tecnologia | Versão | Descrição |
|------------|--------|------------|
| ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat-square&logo=postgresql&logoColor=white) | 15.x | Banco relacional principal |
| ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white) | 5.x | ORM e migrações |

### Modelos principais

| Modelo | Descrição |
|--------|-----------|
| `User` | Utilizadores do sistema (admin/employee) |
| `Category` | Categorias de produtos |
| `Product` | Produtos com variações e estoque |
| `Order` | Pedidos dos clientes |
| `OrderItem` | Itens de cada pedido |
| `Store` | Configurações da loja |

---

## 🐳 DevOps & Ferramentas

| Tecnologia | Versão | Descrição |
|------------|--------|------------|
| ![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white) | 20.x | Containerização |
| ![Docker Compose](https://img.shields.io/badge/Docker%20Compose-2496ED?style=flat-square&logo=docker&logoColor=white) | 2.x | Orquestração de containers |
| ![Git](https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white) | 2.x | Controle de versão |
| ![npm](https://img.shields.io/badge/npm-CB3837?style=flat-square&logo=npm&logoColor=white) | 9.x | Gerenciador de pacotes |
| ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white) | 8.x | Linter de código |
| ![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=flat-square&logo=prettier&logoColor=black) | 3.x | Formatador de código |

---

## 📚 Bibliotecas e Pacotes

### Backend (principais)

| Pacote | Finalidade |
|--------|------------|
| `@nestjs/jwt` | Geração e validação de tokens JWT |
| `@nestjs/passport` | Estratégias de autenticação |
| `@nestjs/throttler` | Rate limiting |
| `bcrypt` | Hashing de senhas |
| `class-transformer` | Transformação de objetos |
| `class-validator` | Validação de DTOs |

### Frontend (principais)

| Pacote | Finalidade |
|--------|------------|
| `lucide-react` | Ícones elegantes |
| `react-icons` | Biblioteca de ícones |
| `sonner` | Toast notifications |
| `framer-motion` | Animações |
| `recharts` | Gráficos e estatísticas |
| `tailwind-merge` | Combinação de classes Tailwind |
| `clsx` | Condicional de classes CSS |

---

## 💡 Por que essas tecnologias?

### Backend

| Tecnologia | Motivo |
|------------|--------|
| **NestJS** | Arquitetura modular, fácil escalabilidade, ótima para equipes |
| **Prisma** | Type-safe, migrações simples, excelente DX |
| **PostgreSQL** | Confiável, suporte a JSON, ótimo custo-benefício |
| **JWT** | Stateless, seguro, fácil integração |

### Frontend

| Tecnologia | Motivo |
|------------|--------|
| **Next.js** | SSR opcional, otimizações automáticas, App Router |
| **Tailwind CSS** | Desenvolvimento rápido, consistência visual |
| **shadcn/ui** | Componentes acessíveis, código fonte controlado |
| **TypeScript** | Menos bugs, melhor manutenção |

### DevOps

| Tecnologia | Motivo |
|------------|--------|
| **Docker** | Ambientes consistentes, fácil deploy |
| **Git** | Controle de versão, colaboração |

---

## 🔒 Segurança

| Aspecto | Tecnologia/Solução |
|---------|-------------------|
| Autenticação | JWT com cookies HTTP-only |
| Senhas | BCrypt (hashing) |
| Rate Limiting | NestJS Throttler |
| CORS | Configuração restrita |
| Validação | Class Validator + Zod |
| SQL Injection | Prisma (prepared statements) |

---


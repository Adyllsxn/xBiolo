# ✨ Funcionalidades

## 📋 Índice

- [👤 Para o Cliente](#-para-o-cliente)
- [🏪 Para o Lojista](#-para-o-lojista)
- [📦 Gestão de Produtos](#-gestão-de-produtos)
- [📋 Gestão de Pedidos](#-gestão-de-pedidos)
- [👥 Gestão de Utilizadores](#-gestão-de-utilizadores)
- [📊 Dashboard](#-dashboard)
- [🖌️ Configurações](#️-configurações)
- [🚀 Roadmap](#-roadmap)

---

## 👤 Para o Cliente

| Funcionalidade | Descrição |
|----------------|-----------|
| 🏠 **Página Inicial** | Banner de destaque, categorias em destaque, produtos mais vistos |
| 📦 **Catálogo de Produtos** | Grid com imagem, nome, preço e variações |
| 🔍 **Filtros** | Por categoria e por preço |
| 🔎 **Busca** | Por nome do produto |
| 📄 **Detalhe do Produto** | Imagem, descrição, variações, quantidade |
| 🛒 **Sacolinha** | Carrinho de compras com ajuste de quantidade |
| 💬 **Finalização** | Envio direto para WhatsApp do lojista |
| ✅ **Confirmação** | Página de sucesso após o pedido |
| 📱 **Responsivo** | Funciona perfeitamente no celular |

---

## 🏪 Para o Lojista

| Funcionalidade | Descrição |
|----------------|-----------|
| 📊 **Dashboard** | Estatísticas, gráficos e resumo do negócio |
| 📦 **Produtos** | CRUD completo com upload de imagens |
| 🏷️ **Categorias** | Organização dos produtos por categorias |
| 📋 **Pedidos** | Visualização, alteração de status e cancelamento |
| 👥 **Utilizadores** | Gestão de admins e funcionários |
| 🖌️ **Configurações** | Dados da loja, aparência e sistema |
| 🗑️ **Soft Delete** | Exclusão com possibilidade de restauração |

---

## 📦 Gestão de Produtos

### ✅ O que você pode fazer

- **Criar produto** com nome, slug, descrição, preço, estoque
- **Selecionar categoria** para organizar o catálogo
- **Adicionar variações** como tamanhos (P, M, G, GG, XL)
- **Upload de imagem** do produto
- **Marcar como ativo ou destaque**
- **Editar produto** a qualquer momento
- **Atualizar estoque** rapidamente
- **Excluir produto** (vai para lixeira)
- **Restaurar produto** da lixeira

### 📊 Tabela de Produtos

| Coluna | O que mostra |
|--------|--------------|
| Imagem | Miniatura do produto |
| Nome | Nome do produto |
| Categoria | Categoria associada |
| Preço | Valor em Kz |
| Estoque | Quantidade disponível |
| Status | Ativo / Inativo / Excluído |
| Ações | Editar, Estoque, Excluir/Restaurar |

---

## 📋 Gestão de Pedidos

### 🏷️ Status dos Pedidos

| Status | Descrição | Ações |
|--------|-----------|-------|
| 🟡 **Pendente** | Pedido aguardando confirmação | Aprovar / Cancelar |
| 🔵 **Aprovado** | Pedido confirmado | Marcar como entregue |
| 🟢 **Entregue** | Pedido finalizado | Visualizar detalhes |
| 🔴 **Cancelado** | Pedido cancelado | Visualizar detalhes |

### 📋 Funcionalidades

- **Lista de pedidos** com paginação (5 por página)
- **Busca** por cliente, telefone ou ID
- **Detalhes do pedido**: cliente, itens, total, pagamento
- **Alterar status** rapidamente
- **Cancelar pedido** (apenas pendentes)

---

## 👥 Gestão de Utilizadores

### 👑 Funções

| Função | Permissões |
|--------|------------|
| **Administrador** | Acesso total: produtos, categorias, pedidos, utilizadores, configurações |
| **Funcionário** | Acesso limitado: produtos, categorias, pedidos |

### ✅ Funcionalidades

- **Lista de utilizadores** com paginação (8 por página)
- **Busca** por nome ou email
- **Criar utilizador** com nome, email e senha
- **Editar utilizador** (nome, email)
- **Alterar função** (admin/employee)
- **Excluir utilizador** (soft delete)
- **Restaurar utilizador** da lixeira
- **Proteção**: não permite excluir o próprio admin logado

---

## 📊 Dashboard

### 📈 Cards de Estatísticas

| Card | Mostra |
|------|--------|
| Produtos | Total de produtos no catálogo |
| Pedidos | Total de pedidos realizados |
| Categorias | Total de categorias cadastradas |
| Receita Total | Soma de todos os pedidos |

### 📉 Gráficos

| Gráfico | Descrição |
|---------|-----------|
| **Vendas por Mês** | Receita mensal acumulada (line chart) |
| **Produtos por Categoria** | Distribuição de produtos (bar chart) |
| **Status dos Pedidos** | Distribuição por status (pie chart) |

### 📋 Outras Informações

- **Ticket Médio**: valor médio por pedido
- **Pedidos Recentes**: últimos 5 pedidos com cliente, total, status e data

---

## 🖌️ Configurações

### 🏢 Informações da Loja

| Campo | Descrição |
|-------|-----------|
| Nome da loja | Nome do seu negócio |
| Email | Email de contato |
| WhatsApp | Número para receber pedidos |
| Endereço | Endereço físico da loja |

### 🎨 Aparência

- **Cor principal**: personalize a cor da sua loja com preview ao vivo

### 🖥️ Informações do Sistema

| Info | Descrição |
|------|-----------|
| Banco de dados | Status da conexão (Connected/Disconnected) |
| Tempo online | Uptime do servidor |
| CPU | Número de núcleos |
| Memória | Uso de memória RAM |
| Versão | Versão da API |

---

## 🚀 Roadmap

### Próximas funcionalidades

- [ ] 📦 **Múltiplas imagens por produto** (galeria)
- [ ] 📊 **Relatórios avançados** (exportar para Excel/PDF)
- [ ] 📱 **App Mobile** (iOS e Android)
- [ ] 🔔 **Notificações push** para novos pedidos
- [ ] 💳 **Pagamento online** (Multicaixa Express, etc.)
- [ ] 🌐 **Multi-loja** (várias lojas na mesma plataforma)
- [ ] 📧 **Marketing** (disparo de emails)

---

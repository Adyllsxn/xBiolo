export const PRODUTOS_CONFIG = {
  title: 'Produtos',
  subtitle: 'Gerencie seu catálogo de produtos',
  limit: 5,
  
  table: {
    columns: {
      image: 'Imagem',
      name: 'Nome',
      category: 'Categoria',
      price: 'Preço',
      stock: 'Estoque',
      status: 'Status',
      actions: 'Ações',
    },
  },
  
  form: {
    name: {
      label: 'Nome do produto',
      placeholder: 'Digite o nome do produto',
    },
    slug: {
      label: 'Slug',
      placeholder: 'nome-do-produto',
      helper: 'Identificador único para a URL',
    },
    description: {
      label: 'Descrição',
      placeholder: 'Descreva o produto...',
    },
    price: {
      label: 'Preço (Kz)',
      placeholder: '0,00',
    },
    categoryId: {
      label: 'Categoria',
      placeholder: 'Selecione uma categoria',
    },
    stock: {
      label: 'Estoque',
      placeholder: 'Quantidade em estoque',
    },
    variations: {
      label: 'Variações',
      placeholder: 'P, M, G, GG',
      helper: 'Separe por vírgula',
    },
    active: {
      label: 'Ativo',
      description: 'Produto visível na loja',
    },
    featured: {
      label: 'Destaque',
      description: 'Produto em destaque na home',
    },
    image: {
      label: 'Imagem do produto',
      button: 'Escolher imagem',
    },
  },
  
  modal: {
    create: {
      title: 'Novo produto',
      description: 'Preencha os dados para adicionar um novo produto',
    },
    edit: {
      title: 'Editar produto',
      description: 'Altere as informações do produto',
    },
    delete: {
      title: 'Excluir produto',
      description: 'Tem certeza que deseja excluir este produto?',
      warning: 'Esta ação pode ser desfeita posteriormente.',
    },
    restore: {
      title: 'Restaurar produto',
      description: 'Tem certeza que deseja restaurar este produto?',
    },
    stock: {
      title: 'Atualizar estoque',
      description: 'Digite a nova quantidade em estoque',
    },
  },
  
  buttons: {
    create: {
      text: 'Novo produto',
    },
    edit: {
      text: 'Editar',
    },
    delete: {
      text: 'Excluir',
    },
    restore: {
      text: 'Restaurar',
    },
    updateStock: {
      text: 'Atualizar estoque',
    },
    save: {
      text: 'Salvar',
      saving: 'Salvando...',
    },
    cancel: {
      text: 'Cancelar',
    },
    confirm: {
      text: 'Confirmar',
    },
  },
  
  status: {
    active: {
      label: 'Ativo',
      className: 'bg-green-100 text-green-700',
    },
    inactive: {
      label: 'Inativo',
      className: 'bg-gray-100 text-gray-700',
    },
    deleted: {
      label: 'Excluído',
      className: 'bg-red-100 text-red-700',
    },
  },
  
  messages: {
    createSuccess: 'Produto criado com sucesso!',
    updateSuccess: 'Produto atualizado com sucesso!',
    deleteSuccess: 'Produto excluído com sucesso!',
    restoreSuccess: 'Produto restaurado com sucesso!',
    stockSuccess: 'Estoque atualizado com sucesso!',
    error: 'Erro ao processar solicitação. Tente novamente.',
  },
};
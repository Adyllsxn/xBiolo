export const CATEGORIAS_CONFIG = {
  title: 'Categorias',
  subtitle: 'Organize seus produtos por categorias',
  
  table: {
    columns: {
      name: 'Nome',
      slug: 'Slug',
      description: 'Descrição',
      order: 'Ordem',
      status: 'Status',
      actions: 'Ações',
    },
  },
  
  toast: {
    createSuccess: {
      title: 'Categoria criada!',
      description: 'A categoria foi adicionada com sucesso.',
    },
    updateSuccess: {
      title: 'Categoria atualizada!',
      description: 'As alterações foram salvas com sucesso.',
    },
    deleteSuccess: {
      title: 'Categoria excluída!',
      description: 'A categoria foi movida para a lixeira.',
    },
    restoreSuccess: {
      title: 'Categoria restaurada!',
      description: 'A categoria foi restaurada com sucesso.',
    },
    error: {
      title: 'Erro!',
      description: 'Ocorreu um erro ao processar sua solicitação. Tente novamente.',
    },
  },
  
  form: {
    name: {
      label: 'Nome da categoria',
      placeholder: 'Digite o nome da categoria',
    },
    slug: {
      label: 'Slug',
      placeholder: 'nome-da-categoria',
      helper: 'Identificador único para a URL',
    },
    description: {
      label: 'Descrição',
      placeholder: 'Descreva a categoria...',
    },
    order: {
      label: 'Ordem',
      placeholder: '0',
      helper: 'Ordem de exibição (menor = primeiro)',
    },
    active: {
      label: 'Ativo',
      description: 'Categoria visível na loja',
    },
  },
  
  modal: {
    create: {
      title: 'Nova categoria',
      description: 'Preencha os dados para adicionar uma nova categoria',
    },
    edit: {
      title: 'Editar categoria',
      description: 'Altere as informações da categoria',
    },
    delete: {
      title: 'Excluir categoria',
      description: 'Tem certeza que deseja excluir esta categoria?',
      warning: 'Produtos vinculados a esta categoria podem ser afetados.',
    },
    restore: {
      title: 'Restaurar categoria',
      description: 'Tem certeza que deseja restaurar esta categoria?',
    },
  },
  
  buttons: {
    create: {
      text: 'Nova categoria',
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
    createSuccess: 'Categoria criada com sucesso!',
    updateSuccess: 'Categoria atualizada com sucesso!',
    deleteSuccess: 'Categoria excluída com sucesso!',
    restoreSuccess: 'Categoria restaurada com sucesso!',
    error: 'Erro ao processar solicitação. Tente novamente.',
  },
};
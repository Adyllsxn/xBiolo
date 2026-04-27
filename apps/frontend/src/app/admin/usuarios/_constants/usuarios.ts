export const USUARIOS_CONFIG = {
  title: 'Utilizadores',
  subtitle: 'Gerencie os utilizadores do sistema',
  limit: 5,
  
  table: {
    columns: {
      name: 'Nome',
      email: 'Email',
      role: 'Função',
      status: 'Status',
      lastLogin: 'Último acesso',
      createdAt: 'Criado em',
      actions: 'Ações',
    },
  },
  
  form: {
    name: {
      label: 'Nome completo',
      placeholder: 'Digite o nome completo',
    },
    email: {
      label: 'Email',
      placeholder: 'usuario@biolo.ao',
      type: 'email',
    },
    password: {
      label: 'Senha',
      placeholder: 'Digite a senha',
      type: 'password',
    },
    role: {
      label: 'Função',
      placeholder: 'Selecione uma função',
    },
  },
  
  modal: {
    create: {
      title: 'Novo utilizador',
      description: 'Preencha os dados para adicionar um novo utilizador',
    },
    edit: {
      title: 'Editar utilizador',
      description: 'Altere as informações do utilizador',
    },
    role: {
      title: 'Alterar função',
      description: 'Selecione a nova função do utilizador',
    },
    delete: {
      title: 'Excluir utilizador',
      description: 'Tem certeza que deseja excluir este utilizador?',
      warning: 'Esta ação pode ser desfeita posteriormente.',
    },
    restore: {
      title: 'Restaurar utilizador',
      description: 'Tem certeza que deseja restaurar este utilizador?',
    },
  },
  
  buttons: {
    create: {
      text: 'Novo utilizador',
    },
    edit: {
      text: 'Editar',
    },
    changeRole: {
      text: 'Alterar função',
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
  
  toast: {
    createSuccess: {
      title: 'Utilizador criado!',
      description: 'O novo utilizador foi adicionado com sucesso.',
    },
    updateSuccess: {
      title: 'Utilizador atualizado!',
      description: 'As informações foram salvas com sucesso.',
    },
    roleSuccess: {
      title: 'Função alterada!',
      description: 'A função do utilizador foi atualizada.',
    },
    deleteSuccess: {
      title: 'Utilizador excluído!',
      description: 'O utilizador foi movido para a lixeira.',
    },
    restoreSuccess: {
      title: 'Utilizador restaurado!',
      description: 'O utilizador foi restaurado com sucesso.',
    },
    error: {
      title: 'Erro!',
      description: 'Ocorreu um erro ao processar sua solicitação. Tente novamente.',
    },
  },
  
  role: {
    admin: {
      label: 'Administrador',
      className: 'bg-purple-100 text-purple-700',
    },
    employee: {
      label: 'Funcionário',
      className: 'bg-blue-100 text-blue-700',
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
    createSuccess: 'Utilizador criado com sucesso!',
    updateSuccess: 'Utilizador atualizado com sucesso!',
    roleSuccess: 'Função alterada com sucesso!',
    deleteSuccess: 'Utilizador excluído com sucesso!',
    restoreSuccess: 'Utilizador restaurado com sucesso!',
    error: 'Erro ao processar solicitação. Tente novamente.',
  },
};

export const ROLE_OPTIONS = [
  { value: 'admin', label: 'Administrador' },
  { value: 'employee', label: 'Funcionário' },
];
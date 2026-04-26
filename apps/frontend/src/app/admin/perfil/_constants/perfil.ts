import { FiUser, FiShield, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

export const PERFIL_CONFIG = {
  title: 'Meu Perfil',
  subtitle: 'Gerencie suas informações pessoais',
  
  sections: {
    info: {
      title: 'Informações Pessoais',
      description: 'Atualize seus dados de cadastro',
      icon: FiUser,
      fields: {
        name: {
          label: 'Nome completo',
          placeholder: 'Digite seu nome completo',
        },
        email: {
          label: 'Email',
          placeholder: 'seu@email.com',
          type: 'email',
        },
      },
    },
    security: {
      title: 'Segurança',
      description: 'Gerencie sua senha e segurança',
      icon: FiShield,
    },
  },
  
  modal: {
    edit: {
      title: 'Editar perfil',
      description: 'Altere suas informações pessoais',
    },
    password: {
      title: 'Alterar senha',
      description: 'Digite sua nova senha',
    },
  },
  
  buttons: {
    edit: {
      text: 'Editar perfil',
    },
    save: {
      text: 'Salvar alterações',
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
    profileSuccess: {
      title: 'Perfil atualizado!',
      description: 'Suas informações foram salvas com sucesso.',
    },
    passwordSuccess: {
      title: 'Senha alterada!',
      description: 'Sua senha foi alterada com sucesso.',
    },
    passwordError: {
      title: 'Senha incorreta',
      description: 'A senha atual está incorreta. Tente novamente.',
    },
    invalidData: {
      title: 'Dados inválidos',
      description: 'Verifique as informações e tente novamente.',
    },
    error: {
      title: 'Erro',
      description: 'Ocorreu um erro ao processar sua solicitação. Tente novamente.',
    },
  },
  
  messages: {
    saveSuccess: 'Perfil atualizado com sucesso!',
    passwordSuccess: 'Senha alterada com sucesso!',
    error: 'Erro ao processar solicitação. Tente novamente.',
    loadError: 'Erro ao carregar perfil',
  },
  
  roles: {
    admin: {
      label: 'Administrador',
      color: 'text-orange-600',
      bg: 'bg-orange-100',
    },
    employee: {
      label: 'Funcionário',
      color: 'text-blue-600',
      bg: 'bg-blue-100',
    },
  },
  
  status: {
    active: {
      label: 'Ativo',
      icon: FiCheckCircle,
      bg: 'bg-green-100',
      color: 'text-green-700',
    },
    inactive: {
      label: 'Inativo',
      icon: FiAlertCircle,
      bg: 'bg-red-100',
      color: 'text-red-700',
    },
  },
};
import { FiUser, FiShield, FiCheckCircle, FiAlertCircle, } from 'react-icons/fi';

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
      buttonText: 'Alterar senha',
      helperText: 'Recomendamos trocar sua senha periodicamente por segurança',
    },
  },
  
  buttons: {
    edit: {
      text: 'Editar perfil',
    },
    save: {
      text: 'Salvar alterações',
    },
    cancel: {
      text: 'Cancelar',
    },
  },
  
  messages: {
    saveSuccess: 'Perfil atualizado com sucesso!',
    saveError: 'Erro ao atualizar perfil. Tente novamente.',
    loadError: 'Erro ao carregar perfil',
  },
  
  roles: {
    admin: {
      label: 'Administrador',
      variant: 'default',
      color: 'text-orange-600',
      bg: 'bg-orange-100',
    },
    employee: {
      label: 'Funcionário',
      variant: 'secondary',
      color: 'text-blue-600',
      bg: 'bg-blue-100',
    },
  },
  
  status: {
    active: {
      label: 'Ativo',
      variant: 'active',
      icon: FiCheckCircle,
      bg: 'bg-green-100',
      color: 'text-green-700',
    },
    inactive: {
      label: 'Inativo',
      variant: 'destructive',
      icon: FiAlertCircle,
      bg: 'bg-red-100',
      color: 'text-red-700',
    },
  },
};
import { FiGlobe, FiDroplet, FiServer } from 'react-icons/fi';

export const CONFIGURACOES_CONFIG = {
  title: 'Configurações',
  subtitle: 'Gerencie as configurações da sua loja',
  
  sections: {
    store: {
      title: 'Informações da Loja',
      description: 'Configure os dados do seu negócio',
      icon: FiGlobe,
      fields: {
        name: {
          label: 'Nome da loja',
          placeholder: 'Digite o nome da sua loja',
        },
        email: {
          label: 'Email',
          placeholder: 'loja@exemplo.com',
          type: 'email',
        },
        whatsapp: {
          label: 'WhatsApp',
          placeholder: '244935751955',
          helper: 'Número com código do país (ex: 244935751955)',
        },
        address: {
          label: 'Endereço',
          placeholder: 'Luanda, Angola',
        },
      },
    },
    appearance: {
      title: 'Aparência',
      description: 'Personalize as cores da sua loja',
      icon: FiDroplet,
      fields: {
        primaryColor: {
          label: 'Cor principal',
          defaultColor: '#E05A2A',
        },
      },
    },
    system: {
      title: 'Informações do Sistema',
      description: 'Status e informações da plataforma',
      icon: FiServer,
    },
  },
  
  toast: {
    success: {
      title: 'Configurações salvas!',
      description: 'As configurações foram atualizadas com sucesso.',
    },
    error: {
      title: 'Erro!',
      description: 'Ocorreu um erro ao salvar as configurações. Tente novamente.',
    },
  },
  
  buttons: {
    edit: {
      text: 'Editar configurações',
    },
    save: {
      text: 'Salvar alterações',
      saving: 'Salvando...',
    },
    cancel: {
      text: 'Cancelar',
    },
  },
  
  messages: {
    loadError: 'Erro ao carregar configurações',
  },
};
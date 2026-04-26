export const PEDIDOS_CONFIG = {
  title: 'Pedidos',
  subtitle: 'Gerencie os pedidos da sua loja',
  limit: 5,
  
  table: {
    columns: {
      id: 'ID',
      client: 'Cliente',
      phone: 'Telefone',
      total: 'Total',
      status: 'Status',
      date: 'Data',
      actions: 'Ações',
    },
  },
  
  status: {
    pending: {
      label: 'Pendente',
      className: 'bg-yellow-100 text-yellow-700',
      icon: '⏳',
    },
    approved: {
      label: 'Aprovado',
      className: 'bg-blue-100 text-blue-700',
      icon: '✓',
    },
    delivered: {
      label: 'Entregue',
      className: 'bg-green-100 text-green-700',
      icon: '✅',
    },
    cancelled: {
      label: 'Cancelado',
      className: 'bg-red-100 text-red-700',
      icon: '✗',
    },
  },
  
  modal: {
    details: {
      title: 'Detalhes do pedido',
      description: 'Informações completas do pedido',
    },
    status: {
      title: 'Alterar status',
      description: 'Selecione o novo status do pedido',
    },
    cancel: {
      title: 'Cancelar pedido',
      description: 'Tem certeza que deseja cancelar este pedido?',
      warning: 'Esta ação não pode ser desfeita.',
    },
  },
  
  buttons: {
    viewDetails: {
      text: 'Ver detalhes',
    },
    updateStatus: {
      text: 'Atualizar status',
    },
    cancel: {
      text: 'Cancelar pedido',
    },
    close: {
      text: 'Fechar',
    },
    confirm: {
      text: 'Confirmar',
    },
  },
  
  messages: {
    statusSuccess: 'Status atualizado com sucesso!',
    cancelSuccess: 'Pedido cancelado com sucesso!',
    error: 'Erro ao processar solicitação. Tente novamente.',
  },
};

export const STATUS_OPTIONS = [
  { value: 'pending', label: 'Pendente' },
  { value: 'approved', label: 'Aprovado' },
  { value: 'delivered', label: 'Entregue' },
  { value: 'cancelled', label: 'Cancelado' },
];
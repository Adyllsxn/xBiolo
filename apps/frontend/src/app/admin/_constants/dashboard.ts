import { FiPackage, FiShoppingCart, FiGrid, FiDollarSign} from 'react-icons/fi';

export type StatusType = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED';

export interface StatusConfig {
  label: string;
  variant: 'default' | 'secondary' | 'destructive' | 'outline';
}

export const DASHBOARD_CONFIG = {
  title: 'Dashboard',
  subtitle: 'Visão geral do seu negócio',
  
  stats: [
    {
      title: 'Produtos',
      icon: FiPackage,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-100',
    },
    {
      title: 'Pedidos',
      icon: FiShoppingCart,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-100',
    },
    {
      title: 'Categorias',
      icon: FiGrid,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-100',
    },
    {
      title: 'Receita Total',
      icon: FiDollarSign,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-100',
    },
  ],
  
  statusMap: {
    PENDING: { label: 'Pendente', variant: 'secondary' as const },
    PROCESSING: { label: 'Processando', variant: 'outline' as const },
    COMPLETED: { label: 'Concluído', variant: 'default' as const },
    CANCELLED: { label: 'Cancelado', variant: 'destructive' as const },
  },
  
  statusColors: {
    PENDING: '#f59e0b',
    PROCESSING: '#3b82f6',
    COMPLETED: '#10b981',
    CANCELLED: '#ef4444',
  },
  
  messages: {
    loading: 'A carregar dashboard...',
    noOrders: 'Nenhum pedido encontrado',
    updatedNow: 'Atualizado agora',
  },
};

export type StatusMapKey = keyof typeof DASHBOARD_CONFIG.statusMap;
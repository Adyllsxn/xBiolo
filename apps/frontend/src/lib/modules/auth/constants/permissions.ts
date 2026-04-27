import { IconType } from 'react-icons';
import {
  FiHome,
  FiShoppingBag,
  FiGrid,
  FiShoppingCart,
  FiUsers,
  FiSettings,
  FiUser,
} from 'react-icons/fi';

export type MenuItem = {
  name: string;
  href: string;
  icon: IconType;
  roles: ('admin' | 'employee')[];
};

export const MENU_ITEMS: MenuItem[] = [
  { name: 'Dashboard', href: '/admin', icon: FiHome, roles: ['admin', 'employee'] },
  { name: 'Produtos', href: '/admin/produtos', icon: FiShoppingBag, roles: ['admin', 'employee'] },
  { name: 'Categorias', href: '/admin/categorias', icon: FiGrid, roles: ['admin', 'employee'] },
  { name: 'Pedidos', href: '/admin/pedidos', icon: FiShoppingCart, roles: ['admin', 'employee'] },
  { name: 'Utilizadores', href: '/admin/usuarios', icon: FiUsers, roles: ['admin'] },
  { name: 'Perfil', href: '/admin/perfil', icon: FiUser, roles: ['admin', 'employee'] },
  { name: 'Configurações', href: '/admin/configuracoes', icon: FiSettings, roles: ['admin'] },
];

export const canAccess = (role: string | null, itemRoles: ('admin' | 'employee')[]): boolean => {
  if (!role) return false;
  return itemRoles.includes(role as 'admin' | 'employee');
};
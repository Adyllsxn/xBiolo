import { IconType } from 'react-icons';
import {
  FiHome,
  FiShoppingBag,
  FiGrid,
  FiShoppingCart,
  FiUsers,
  FiSettings,
  FiUser,
  FiLogOut,
} from 'react-icons/fi';

interface NavItem {
  name: string;
  href: string;
  icon: IconType;
}

interface SidebarCategories {
  principal: NavItem[];
  definicoes: NavItem[];
  logout: NavItem;
}

export const SIDEBAR_CATEGORIES: SidebarCategories = {
  principal: [
    { name: 'Dashboard', href: '/admin', icon: FiHome },
    { name: 'Produtos', href: '/admin/produtos', icon: FiShoppingBag },
    { name: 'Categorias', href: '/admin/categorias', icon: FiGrid },
    { name: 'Pedidos', href: '/admin/pedidos', icon: FiShoppingCart },
    { name: 'Utilizadores', href: '/admin/usuarios', icon: FiUsers },
  ],
  definicoes: [
    { name: 'Perfil', href: '/admin/perfil', icon: FiUser },
    { name: 'Configurações', href: '/admin/configuracoes', icon: FiSettings },
  ],
  logout: { name: 'Sair', href: '/auth/logout', icon: FiLogOut },
};

export const SIDEBAR_STORE = {
  name: 'Biolo',
  version: 'v1.0',
  description: 'Painel Administrativo',
};

export const LOGOUT_CONFIG = {
  title: 'Sessão encerrada',
  message: 'Você saiu do painel administrativo com sucesso.',
  buttonLogin: {
    text: 'Entrar novamente',
    href: '/auth/login',
  },
  buttonBack: {
    text: 'Voltar para o site',
    href: '/',
  },
  icon: FiLogOut,
  iconColor: 'text-green-600 dark:text-green-400',
  iconBg: 'bg-green-100 dark:bg-green-900/30',
  copyright: `© ${new Date().getFullYear()} Biolo. Todos os direitos reservados.`,
};
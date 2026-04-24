'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useState, useEffect, JSX } from 'react';
import { IconType } from 'react-icons';
import { SIDEBAR_CATEGORIES, SIDEBAR_STORE } from '@/lib/constants';
import { logout } from '@/lib/modules/auth';

interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

interface SidebarContentProps {
  collapsed: boolean;
  onClose?: () => void;
}

interface NavItem {
  name: string;
  href: string;
  icon: IconType;
}

function SidebarContent({ collapsed, onClose }: SidebarContentProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { principal, definicoes, logout: logoutItem } = SIDEBAR_CATEGORIES;

  const isActive = (href: string): boolean => {
    return pathname === href || pathname?.startsWith(href + '/');
  };

  const handleLinkClick = (): void => {
    if (onClose) onClose();
  };

  const handleLogout = async (e: React.MouseEvent): Promise<void> => {
    e.preventDefault();
    try {
      await logout();
      // Limpar dados locais
      localStorage.removeItem('biolo-sidebar-collapsed');
      localStorage.removeItem('biolo_admin_auth');
      // Redirecionar para a página de logout (que mostra a mensagem de sessão encerrada)
      router.push('/auth/logout');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      // Mesmo com erro, redireciona para a página de logout
      router.push('/auth/logout');
    }
  };

  const renderNavItem = (item: NavItem, isLogout?: boolean): JSX.Element => {
    const Icon = item.icon;
    const active = isActive(item.href);

    // Caso especial para logout - usa button em vez de Link
    if (isLogout) {
      if (collapsed) {
        return (
          <div key={item.name} className="relative group">
            <button
              onClick={handleLogout}
              className="flex justify-center items-center py-2 rounded-lg transition-all w-full text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
            >
              <Icon size={20} />
            </button>
          </div>
        );
      }

      return (
        <button
          key={item.name}
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 rounded-lg transition-all w-full text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
        >
          <Icon size={18} />
          <span className="text-sm font-medium">{item.name}</span>
        </button>
      );
    }

    // Itens normais
    if (collapsed) {
      return (
        <div key={item.name} className="relative group">
          <Link
            href={item.href}
            onClick={handleLinkClick}
            className={`flex justify-center items-center py-2 rounded-lg transition-all ${
              active
                ? 'bg-orange-50 dark:bg-orange-950/40 text-orange-600'
                : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <Icon size={20} />
          </Link>
        </div>
      );
    }

    return (
      <Link
        key={item.name}
        href={item.href}
        onClick={handleLinkClick}
        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
          active
            ? 'bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400'
            : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
        }`}
      >
        <Icon size={18} />
        <span className="text-sm font-medium">{item.name}</span>
      </Link>
    );
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-950">
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-gray-100 dark:border-gray-800 flex-shrink-0">
        {!collapsed ? (
          <Link href="/admin" className="flex flex-col w-full">
            <h1 className="text-lg font-bold text-orange-500">{SIDEBAR_STORE.name}</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">{SIDEBAR_STORE.description}</p>
          </Link>
        ) : (
          <Link href="/admin" className="flex justify-center w-full">
            <span className="text-sm font-bold text-orange-500">B</span>
          </Link>
        )}
      </div>

      {/* Navigation - Principal */}
      <div className="flex-1 overflow-y-auto min-h-0 py-4">
        {!collapsed && (
          <div className="px-3 mb-2">
            <p className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider px-2">
              Principal
            </p>
          </div>
        )}
        <div className="space-y-1 px-3 mb-6">
          {principal.map((item: NavItem) => renderNavItem(item))}
        </div>

        {/* Definições */}
        {!collapsed && (
          <div className="px-3 mb-2">
            <p className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider px-2">
              Definições
            </p>
          </div>
        )}
        <div className="space-y-1 px-3">
          {definicoes.map((item: NavItem) => renderNavItem(item))}
        </div>
      </div>

      {/* Logout - fixo no final */}
      <div className="p-3 border-t border-gray-100 dark:border-gray-800 flex-shrink-0">
        {renderNavItem(logoutItem, true)}
      </div>
    </div>
  );
}

export function Sidebar({ mobileOpen, setMobileOpen }: SidebarProps) {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const saved = localStorage.getItem('biolo-sidebar-collapsed');
    if (saved !== null) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCollapsed(JSON.parse(saved));
    }

    const checkMobile = (): void => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSidebar = (): void => {
    const newState = !collapsed;
    setCollapsed(newState);
    localStorage.setItem('biolo-sidebar-collapsed', JSON.stringify(newState));
  };

  // Mobile: Drawer
  if (isMobile) {
    return (
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              className="fixed top-0 left-0 z-50 w-72 h-screen bg-white dark:bg-gray-950 shadow-2xl flex flex-col"
            >
              <div className="flex justify-end p-2 flex-shrink-0">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="flex-1 overflow-hidden">
                <SidebarContent collapsed={false} onClose={() => setMobileOpen(false)} />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    );
  }

  // Desktop
  return (
    <div className="relative h-screen">
      <aside
        className={`h-screen bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 ease-in-out overflow-hidden ${
          collapsed ? 'w-16' : 'w-64'
        }`}
      >
        <SidebarContent collapsed={collapsed} />
      </aside>

      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-20 z-50 w-6 h-6 rounded-full bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </div>
  );
}
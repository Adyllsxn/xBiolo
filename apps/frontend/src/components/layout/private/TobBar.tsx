'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, Moon, Sun, X } from 'lucide-react';
import { TOPBAR_CONFIG } from '@/lib/constants';
import { getMe, type User } from '@/lib/modules/account';

interface TopBarProps {
  onMenuClick: () => void;
}

export function TopBar({ onMenuClick }: TopBarProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMe()
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao carregar usuário:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('biolo-admin-theme') as 'light' | 'dark';
    const isDark = document.documentElement.classList.contains('dark');
    if (savedTheme) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTheme(savedTheme);
    } else {
      setTheme(isDark ? 'dark' : 'light');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('biolo-admin-theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-between px-4 h-16">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
        >
          <Menu size={20} />
        </button>

        <div className="hidden lg:block min-w-[180px]">
          {!loading && user && (
            <>
              <h1 className="text-lg font-semibold text-gray-800 dark:text-white">
                Olá, {user.name.split(' ')[0]}
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Bem-vindo de volta</p>
            </>
          )}
        </div>

        <div className="flex-1 flex justify-center px-4">
          <div className="hidden md:block relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder={TOPBAR_CONFIG.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSearchOpen(true)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
          >
            <Search size={18} />
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            aria-label="Alternar tema"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <div className="hidden md:flex items-center gap-2 ml-2">
            {!loading && user && (
              <>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white text-sm font-medium">
                  {getInitials(user.name)}
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {user.name}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-white dark:bg-gray-900 md:hidden"
          >
            <div className="p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    autoFocus
                    placeholder={TOPBAR_CONFIG.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-sm"
                  />
                </div>
                <button onClick={() => setSearchOpen(false)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                  <X size={20} />
                </button>
              </div>
              
              {searchQuery && (
                <div className="mt-4">
                  <p className="text-xs text-gray-500 mb-2">Resultados</p>
                  <div className="space-y-2">
                    <div className="p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                      <p className="text-sm">Dashboard</p>
                    </div>
                    <div className="p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                      <p className="text-sm">Produtos</p>
                    </div>
                    <div className="p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                      <p className="text-sm">Pedidos</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
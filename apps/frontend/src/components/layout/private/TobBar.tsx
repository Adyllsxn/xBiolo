'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, Moon, Sun, X, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { TOPBAR_CONFIG } from '@/lib/constants';
import { getMe, type User } from '@/lib/modules/account';
import { usePermissions } from '@/lib/modules/auth';
import { useGlobalSearch } from '@/lib/hooks/useGlobalSearch';

interface TopBarProps {
  onMenuClick: () => void;
}

export function TopBar({ onMenuClick }: TopBarProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = usePermissions();
  const { results, loading: searchLoading } = useGlobalSearch(searchQuery);

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

  const handleSearch = (href: string) => {
    setSearchOpen(false);
    setSearchQuery('');
    setSelectedIndex(-1);
    router.push(href);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => prev < results.length - 1 ? prev + 1 : prev);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && results[selectedIndex]) {
        handleSearch(results[selectedIndex].href);
      } else if (results.length === 1) {
        handleSearch(results[0].href);
      }
    } else if (e.key === 'Escape') {
      setSearchOpen(false);
      setSearchQuery('');
      setSelectedIndex(-1);
    }
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
            <div>
              <h1 className="text-lg font-semibold text-gray-800 dark:text-white">
                Olá, {user.name.split(' ')[0]}
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {isAdmin ? 'Administrador' : 'Funcionário'}
              </p>
            </div>
          )}
        </div>

        <div className="flex-1 flex justify-center px-4">
          <div className="hidden md:block relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              ref={inputRef}
              type="text"
              placeholder={TOPBAR_CONFIG.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSelectedIndex(-1);
              }}
              onKeyDown={handleKeyDown}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm"
            />
            {searchLoading && searchQuery && (
              <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 animate-spin" size={18} />
            )}
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

      {/* Desktop Search Results Dropdown */}
      {searchQuery && searchQuery.length >= 2 && (
        <div className="hidden md:block absolute left-0 right-0 mx-auto mt-2 w-full max-w-md bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50" style={{ left: '50%', transform: 'translateX(-50%)' }}>
          <div className="py-2 max-h-96 overflow-y-auto">
            {results.length > 0 ? (
              <>
                <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-800">
                  Resultados da busca
                </div>
                {results.map((item, index) => (
                  <button
                    key={`${item.type}-${item.id}`}
                    onClick={() => handleSearch(item.href)}
                    className={`w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left ${
                      selectedIndex === index ? 'bg-gray-100 dark:bg-gray-800' : ''
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800 dark:text-white">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.subtitle}</p>
                    </div>
                    <span className="text-xs text-gray-400 capitalize">{item.type}</span>
                  </button>
                ))}
                <div className="px-3 py-2 text-xs text-gray-400 border-t border-gray-100 dark:border-gray-800">
                  <span className="mr-3">↑ ↓</span> navegar · <span className="ml-3 mr-3">↵</span> selecionar · <span className="ml-3">ESC</span> fechar
                </div>
              </>
            ) : !searchLoading && (
              <div className="px-3 py-8 text-center">
                <Search className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Nenhum resultado encontrado para &quot;{searchQuery}&quot;</p>
              </div>
            )}
          </div>
        </div>
      )}

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
                    onKeyDown={handleKeyDown}
                    className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-sm"
                  />
                  {searchLoading && (
                    <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 animate-spin" size={18} />
                  )}
                </div>
                <button onClick={() => setSearchOpen(false)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                  <X size={20} />
                </button>
              </div>
              
              {searchQuery && searchQuery.length >= 2 && (
                <div className="mt-4 max-h-[calc(100vh-120px)] overflow-y-auto">
                  {results.length > 0 ? (
                    <>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">
                        Resultados
                      </p>
                      <div className="space-y-1">
                        {results.map((item, index) => (
                          <button
                            key={`${item.type}-${item.id}`}
                            onClick={() => handleSearch(item.href)}
                            className={`w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                              selectedIndex === index ? 'bg-gray-100 dark:bg-gray-800' : ''
                            }`}
                          >
                            <span className="text-xl">{item.icon}</span>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-800 dark:text-white">{item.name}</p>
                              <p className="text-xs text-gray-500">{item.subtitle}</p>
                            </div>
                            <span className="text-xs text-gray-400 capitalize">{item.type}</span>
                          </button>
                        ))}
                      </div>
                    </>
                  ) : !searchLoading && (
                    <div className="text-center py-8">
                      <Search className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-500">Nenhum resultado encontrado para &quot;{searchQuery}&quot;</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
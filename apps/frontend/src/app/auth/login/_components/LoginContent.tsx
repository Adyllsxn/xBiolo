'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { LOGIN_CONFIG } from '../_constants/login';
import { login } from '@/lib/modules/auth';
import { AxiosError } from 'axios';

export default function LoginContent() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await login({ email, password });
      
      if (response.data) {
        router.push('/admin');
      }
    } catch (err: unknown) {
      console.error('Erro no login:', err);
      
      if (err instanceof AxiosError) {
        const status = err.response?.status;
        
        if (status === 401) {
          setError(LOGIN_CONFIG.errorMessage);
        } else if (status === 429) {
          setError('Muitas tentativas. Aguarde 2 minutos.');
        } else {
          setError('Erro ao conectar com o servidor. Tente novamente.');
        }
      } else {
        setError('Erro ao conectar com o servidor. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-orange-500">{LOGIN_CONFIG.title}</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">{LOGIN_CONFIG.subtitle}</p>
        </div>

        {/* Card de login */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
            {LOGIN_CONFIG.welcome}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {LOGIN_CONFIG.emailLabel}
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={LOGIN_CONFIG.emailPlaceholder}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {LOGIN_CONFIG.passwordLabel}
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={LOGIN_CONFIG.passwordPlaceholder}
                  className="w-full pl-10 pr-12 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-red-500 text-center"
              >
                {error}
              </motion.p>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? LOGIN_CONFIG.buttonLoading : LOGIN_CONFIG.buttonLogin}
            </button>
          </form>

          {/* Link para recuperar senha */}
          <div className="text-center mt-6">
            <Link
              href={LOGIN_CONFIG.forgotPasswordLink}
              className="text-sm text-gray-500 hover:text-orange-500 transition"
            >
              {LOGIN_CONFIG.forgotPassword}
            </Link>
          </div>
        </div>

        {/* Créditos */}
        <p className="text-center text-xs text-gray-400 mt-6">
          {LOGIN_CONFIG.copyright}
        </p>
      </motion.div>
    </div>
  );
}
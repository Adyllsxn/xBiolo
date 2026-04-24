'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { LOGOUT_CONFIG } from '../_constants/logout';

export default function LogoutContent() {
  const { icon: Icon, iconColor, iconBg, title, message, buttonLogin, buttonBack, copyright } = LOGOUT_CONFIG;

  useEffect(() => {
    localStorage.removeItem('biolo_admin_auth');
    // TODO: Chamar API de logout se necessário
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md text-center"
      >
        <div className={`w-20 h-20 mx-auto mb-6 rounded-full ${iconBg} flex items-center justify-center`}>
          <Icon className={`w-10 h-10 ${iconColor}`} />
        </div>

        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{title}</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">{message}</p>

        <div className="space-y-3">
          <Link
            href={buttonLogin.href}
            className="block w-full py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-all duration-200"
          >
            {buttonLogin.text}
          </Link>
          <Link
            href={buttonBack.href}
            className="inline-flex items-center justify-center gap-2 text-gray-500 hover:text-orange-500 transition"
          >
            <FiArrowLeft size={16} />
            {buttonBack.text}
          </Link>
        </div>

        <p className="text-center text-xs text-gray-400 mt-8">{copyright}</p>
      </motion.div>
    </div>
  );
}
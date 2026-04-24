'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiMail, FiArrowLeft, FiCheckCircle } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { FORGOT_PASSWORD_CONFIG } from '../_constants/forgot-password';

export default function ForgotPasswordContent() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSent(false);

    // TODO: Integrar com API de recuperação de senha
    // Simulação
    setTimeout(() => {
      if (email === 'admin@biolo.ao') {
        setSent(true);
      } else {
        setError(FORGOT_PASSWORD_CONFIG.errorMessage);
      }
      setLoading(false);
    }, 1000);
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
          <h1 className="text-3xl font-bold text-orange-500">{FORGOT_PASSWORD_CONFIG.title}</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">{FORGOT_PASSWORD_CONFIG.subtitle}</p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8">
          <AnimatePresence mode="wait">
            {!sent ? (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p className="text-gray-500 dark:text-gray-400 text-center mb-6">
                  {FORGOT_PASSWORD_CONFIG.description}
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {FORGOT_PASSWORD_CONFIG.emailLabel}
                    </label>
                    <div className="relative">
                      <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={FORGOT_PASSWORD_CONFIG.emailPlaceholder}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                        required
                      />
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
                    {loading ? FORGOT_PASSWORD_CONFIG.buttonSending : FORGOT_PASSWORD_CONFIG.buttonSend}
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <FiCheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  Email enviado!
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  {FORGOT_PASSWORD_CONFIG.successMessage}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Link voltar */}
          <div className="text-center mt-6">
            <Link
              href={FORGOT_PASSWORD_CONFIG.backLink}
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-orange-500 transition"
            >
              <FiArrowLeft size={16} />
              {FORGOT_PASSWORD_CONFIG.buttonBack}
            </Link>
          </div>
        </div>

        {/* Créditos */}
        <p className="text-center text-xs text-gray-400 mt-6">
          {FORGOT_PASSWORD_CONFIG.copyright}
        </p>
      </motion.div>
    </div>
  );
}
import { FiLogOut } from 'react-icons/fi';

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
import { FiHeart, FiTarget, FiEye, FiShoppingBag, FiUsers, FiZap } from 'react-icons/fi';

export const ABOUT_PAGE = {
  header: {
    badge: 'Sobre',
    titlePrefix: 'Conheça o',
    titleHighlight: 'Projeto',
    description: 'Plataforma de catálogo digital com integração via WhatsApp'
  },
  story: {
    icon: FiHeart,
    badge: 'História',
    titlePrefix: 'Como',
    titleHighlight: 'começou',
    paragraphs: [
      'Este projeto nasceu da necessidade de soluções digitais para catálogos de produtos.',
      'Uma plataforma simples onde o cliente escolhe produtos e finaliza pedidos diretamente no WhatsApp.'
    ]
  },
  mission: {
    icon: FiTarget,
    titlePrefix: '',
    titleHighlight: 'Missão',
    description: 'Fornecer uma solução eficiente para catálogos digitais com integração via WhatsApp.'
  },
  vision: {
    icon: FiEye,
    titlePrefix: '',
    titleHighlight: 'Visão',
    description: 'Ser uma referência em soluções de catálogo digital.'
  },
  values: {
    titlePrefix: '',
    titleHighlight: 'Valores',
    subtitle: '',
    items: [
      {
        icon: FiShoppingBag,
        title: 'Simplicidade',
        description: 'Interface intuitiva'
      },
      {
        icon: FiUsers,
        title: 'Tecnologia',
        description: 'Solução moderna'
      },
      {
        icon: FiZap,
        title: 'Agilidade',
        description: 'Processo rápido'
      }
    ]
  }
};
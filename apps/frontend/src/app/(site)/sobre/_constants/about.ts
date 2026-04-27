import { FiHeart, FiTarget, FiEye, FiShoppingBag, FiUsers, FiTruck } from 'react-icons/fi';

export const ABOUT_PAGE = {
  header: {
    badge: 'Sobre nós',
    titlePrefix: 'Conheça a',
    titleHighlight: 'Biolo',
    description: 'A plataforma que conecta pequenos negócios angolanos a clientes de forma simples e eficiente'
  },
  story: {
    icon: FiHeart,
    badge: 'Nossa história',
    titlePrefix: 'Como tudo',
    titleHighlight: 'começou',
    paragraphs: [
      'O Biolo nasceu da necessidade de ajudar pequenos negócios angolanos a terem presença digital. Vimos que muitos lojistas tinham dificuldade em mostrar seus produtos de forma profissional e alcançar mais clientes.',
      'Foi assim que criamos o Biolo: uma plataforma simples, sem complicação, onde o cliente escolhe os produtos, bota na sacolinha e o pedido vai direto para o WhatsApp do lojista.'
    ]
  },
  mission: {
    icon: FiTarget,
    titlePrefix: 'Nossa',
    titleHighlight: 'missão',
    description: 'Democratizar o acesso ao comércio digital em Angola, oferecendo uma plataforma simples, acessível e eficiente para pequenos negócios.'
  },
  vision: {
    icon: FiEye,
    titlePrefix: 'Nossa',
    titleHighlight: 'visão',
    description: 'Ser a principal plataforma de catálogo digital para pequenos negócios em Angola, conectando lojistas e clientes de forma simples e eficiente.'
  },
  values: {
    titlePrefix: 'Nossos',
    titleHighlight: 'valores',
    subtitle: 'O que nos move e nos define',
    items: [
      {
        icon: FiShoppingBag,
        title: 'Simplicidade',
        description: 'Comprar deve ser fácil, sem complicações'
      },
      {
        icon: FiUsers,
        title: 'Comunidade',
        description: 'Apoiamos pequenos negócios em Angola'
      },
      {
        icon: FiTruck,
        title: 'Agilidade',
        description: 'Entregamos rápido em toda Luanda'
      }
    ]
  }
};
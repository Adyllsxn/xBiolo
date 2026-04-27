import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { FaWhatsapp, FaInstagram, FaFacebook } from 'react-icons/fa';

export const CONTACT_INFO = [
  {
    icon: FiPhone,
    label: 'Telefone / WhatsApp',
    value: '+244 923 456 789',
    href: 'tel:+244923456789',
    description: 'Segunda a Sábado, 8h às 18h'
  },
  {
    icon: FiMail,
    label: 'E-mail',
    value: 'biolo@biolo.ao',
    href: 'mailto:biolo@biolo.ao',
    description: 'Respondemos em até 24h'
  },
  {
    icon: FiMapPin,
    label: 'Endereço',
    value: 'Luanda, Angola',
    href: 'https://maps.google.com',
    description: 'Entregamos para toda Luanda'
  }
];

export const SOCIAL_LINKS = [
  { name: 'WhatsApp', icon: FaWhatsapp, href: 'https://wa.me/244923456789' },
  { name: 'Instagram', icon: FaInstagram, href: 'https://instagram.com/biolo' },
  { name: 'Facebook', icon: FaFacebook, href: 'https://facebook.com/biolo' }
];

export const FAQ_PREVIEW = [
  { question: 'Como faço para comprar?', link: '/faq' },
];

export const CONTACT_PAGE = {
  title: 'Fale connosco',
  subtitle: 'Estamos aqui para ajudar',
  description: 'Tem dúvidas? Precisa de ajuda? Entre em contacto através dos canais abaixo.',
  supportText: 'Atendimento rápido e personalizado'
};
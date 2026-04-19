import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { FaWhatsapp, FaInstagram, FaFacebook, FaTiktok } from 'react-icons/fa';

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
  { name: 'WhatsApp', icon: FaWhatsapp, href: 'https://wa.me/244923456789', color: '#25D366' },
  { name: 'Instagram', icon: FaInstagram, href: 'https://instagram.com/biolo', color: '#E4405F' },
  { name: 'Facebook', icon: FaFacebook, href: 'https://facebook.com/biolo', color: '#1877F2' },
  { name: 'TikTok', icon: FaTiktok, href: 'https://tiktok.com/@biolo', color: '#000000' }
];

export const FAQ_PREVIEW = [
  { question: 'Como faço para comprar?', link: '/faq' },
  { question: 'Quais as formas de pagamento?', link: '/formas-de-pagamento' },
];

export const CONTACT_PAGE = {
  title: 'Fale connosco',
  subtitle: 'Estamos aqui para ajudar',
  description: 'Tem dúvidas? Precisa de ajuda? Entre em contacto através dos canais abaixo.',
  supportText: 'Atendimento rápido e personalizado'
};
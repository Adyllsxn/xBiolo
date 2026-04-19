import { FaWhatsapp, FaInstagram, FaFacebook } from 'react-icons/fa';
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi';

export const FOOTER_SERVICES = [
  { name: 'Como comprar', href: '/como-comprar' },
  { name: 'Formas de pagamento', href: '/formas-de-pagamento' },
  { name: 'Perguntas frequentes', href: '/faq' },
];

export const FOOTER_INSTITUTIONAL = [
  { name: 'Sobre a Biolo', href: '/sobre' },
  { name: 'Contacto', href: '/contacto' },
];

export const FOOTER_CONTACT = [
  { icon: FiPhone, text: '+244 923 456 789', href: 'tel:+244923456789' },
  { icon: FiMail, text: 'biolo@biolo.ao', href: 'mailto:biolo@biolo.ao' },
  { icon: FiMapPin, text: 'Luanda, Angola', href: 'https://maps.google.com' },
];

export const FOOTER_SOCIAL = [
  { name: 'WhatsApp', icon: FaWhatsapp, href: 'https://wa.me/244923456789' },
  { name: 'Instagram', icon: FaInstagram, href: 'https://instagram.com/biolo' },
  { name: 'Facebook', icon: FaFacebook, href: 'https://facebook.com/biolo' },
];

export const FOOTER_NEWSLETTER = {
  title: 'Receba novidades',
  description: 'Cadastre-se e receba ofertas exclusivas',
  placeholder: 'Seu melhor email',
  buttonText: 'Cadastrar',
};

export const FOOTER_COPYRIGHT = 'Todos os direitos reservados.';
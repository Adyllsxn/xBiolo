import { FaWhatsapp, FaInstagram, FaFacebook } from 'react-icons/fa';
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi';

export const FOOTER_SERVICES = [
  { name: 'Como comprar', href: '/como-comprar' },
  { name: 'Perguntas frequentes', href: '/faq' },
];

export const FOOTER_INSTITUTIONAL = [
  { name: 'Sobre a Biolo', href: '/sobre' },
  { name: 'Contacto', href: '/contacto' },
];

export const FOOTER_CONTACT = [
  { icon: FiPhone, text: '+244 900 000 000', href: 'tel:+244900000000' },
  { icon: FiMail, text: 'biolo@biolo.ao', href: '' },
  { icon: FiMapPin, text: 'Luanda, Angola', href: 'https://maps.google.com' },
];

export const FOOTER_SOCIAL = [
  { name: 'WhatsApp', icon: FaWhatsapp, href: 'https://wa.me/244900000000' },
  { name: 'Instagram', icon: FaInstagram, href: '' },
  { name: 'Facebook', icon: FaFacebook, href: '' },
];

export const FOOTER_NEWSLETTER = {
  title: 'Receba novidades',
  description: 'Cadastre-se e receba ofertas exclusivas',
  placeholder: 'Seu melhor email',
  buttonText: 'Cadastrar',
};

export const FOOTER_COPYRIGHT = 'Todos os direitos reservados.';
import { FiShoppingBag, FiHeart, FiPackage } from 'react-icons/fi';

export const CATEGORIES_DATA = {
  title: 'Explore nossas categorias',
  subtitle: 'Do tradicional ao moderno',
  description: 'Temos o que você procura para todos os momentos da sua vida',
  categories: [
    {
      name: 'Vestidos',
      icon: FiShoppingBag,
      href: '/produtos?categoria=vestidos',
      color: '#ec489a',
      bgColor: 'bg-pink-100',
      description: 'Para momentos especiais e inesquecíveis',
      borderStyle: 'border-l-4 border-l-pink-500/50 rounded-r-2xl',
      align: 'right'
    },
    {
      name: 'Blusas',
      icon: FiHeart,
      href: '/produtos?categoria=blusas',
      color: '#3b82f6',
      bgColor: 'bg-blue-100',
      description: 'Conforto e estilo para o dia a dia',
      borderStyle: 'border-r-4 border-r-blue-500/50 rounded-l-2xl',
      align: 'left'
    },
  ],
};
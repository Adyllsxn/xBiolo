import { FiShoppingBag, FiGrid, FiShoppingCart, FiCheckCircle, FiTruck } from 'react-icons/fi';

export const HOW_TO_BUY_STEPS = [
  {
    icon: FiGrid,
    title: 'Navegue pelo catálogo',
    description: 'Explore nossos produtos e encontre o que deseja. Use os filtros para facilitar a busca.',
    number: 1
  },
  {
    icon: FiShoppingBag,
    title: 'Escolha o tamanho',
    description: 'Selecione a variação desejada (P, M, G, etc). Cada produto tem suas opções disponíveis.',
    number: 2
  },
  {
    icon: FiShoppingCart,
    title: 'Bote na sacolinha',
    description: 'Adicione o produto ao seu carrinho. Você pode continuar comprando ou finalizar.',
    number: 3
  },
  {
    icon: FiCheckCircle,
    title: 'Finalize o pedido',
    description: 'Preencha seus dados (nome, endereço) e escolha a forma de pagamento.',
    number: 4
  },
  {
    icon: FiTruck,
    title: 'Receba em casa',
    description: 'O lojista vai te contactar pelo WhatsApp para confirmar e combinar a entrega.',
    number: 5
  }
];

export const TIPS = [
  {
    title: 'Verifique os tamanhos',
    description: 'Confira a tabela de medidas de cada produto antes de escolher a variação.'
  },
  {
    title: 'Acompanhe seu pedido',
    description: 'Após finalizar, o lojista entrará em contacto pelo WhatsApp para atualizar você.'
  },
  {
    title: 'Dúvidas? Fale connosco',
    description: 'Se tiver qualquer dúvida, entre em contacto pelo WhatsApp ou pela nossa página de contacto.'
  }
];

export const HOW_TO_BUY_PAGE = {
  title: 'Como comprar no Biolo',
  subtitle: 'Compra simples e rápida',
  description: 'Siga os passos abaixo e faça seu pedido em poucos minutos. Sem complicação, sem cadastro.',
  stepsTitle: 'Passo a passo',
  tipsTitle: 'Dicas importantes',
  ctaText: 'Começar a comprar',
  ctaLink: '/produtos'
};
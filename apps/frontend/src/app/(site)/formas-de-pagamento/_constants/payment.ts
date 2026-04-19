import { FiCreditCard, FiDollarSign } from 'react-icons/fi';

export const PAYMENT_METHODS = [
  {
    icon: FiCreditCard,
    title: 'Cartão de crédito',
    description: 'Parcelamos em até 3x sem juros. Aceitamos Visa, Mastercard, Elo e American Express.',
    details: ['Parcelamento em até 3x', 'Sem taxas adicionais', 'Pagamento 100% seguro']
  },
  {
    icon: FiDollarSign,
    title: 'Dinheiro',
    description: 'Pagamento na entrega. Você paga no momento que receber o produto.',
    details: ['Pagamento na entrega', 'Aceitamos qualquer valor', 'Troco disponível']
  }
];

export const PAYMENT_PAGE = {
  title: 'Formas de pagamento',
  description: 'Escolha a melhor opção para você. Todas as formas são seguras e práticas.',
  currency: 'Kz'
};
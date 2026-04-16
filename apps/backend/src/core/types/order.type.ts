import { OrderStatus, PaymentMethod } from '@prisma/generated/enums';

export type IOrderItem = {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  variation: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type IOrder = {
  id: string;
  clientName: string;
  clientAddress: string;
  clientPhone: string | null;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  total: number;
  items: IOrderItem[];
  createdAt: Date;
  updatedAt: Date;
};

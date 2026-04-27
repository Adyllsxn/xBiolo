export interface Order {
  id: string;
  clientName: string;
  clientAddress: string;
  clientPhone: string;
  paymentMethod: string;
  status: string;
  total: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  variation: string;
}

export interface OrderWithItems extends Order {
  items: OrderItem[];
}

export interface CreateOrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  variation: string;
}

export interface CreateOrderRequest {
  clientName: string;
  clientAddress: string;
  clientPhone: string;
  paymentMethod: string;
  items: CreateOrderItem[];
}

export interface OrderResponse {
  id: string;
  clientName: string;
  clientAddress: string;
  clientPhone: string;
  paymentMethod: string;
  status: string;
  total: number;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
}

export interface PaginatedOrdersResponse {
  data: Order[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
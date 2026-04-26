'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { FiSearch } from 'react-icons/fi';
import { getAllOrders, getOrderById, type Order, type OrderResponse, type PaginatedOrdersResponse } from '@/lib/modules/order';
import { OrdersTable } from './_components/OrdersTable';
import { Pagination } from './_components/Pagination';
import { OrderDetailsModal } from './_modals/OrderDetailsModal';
import { UpdateStatusModal } from './_modals/UpdateStatusModal';
import { CancelOrderModal } from './_modals/CancelOrderModal';
import { PEDIDOS_CONFIG } from './_constants/pedidos';

export default function PedidosPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<OrderResponse | null>(null);

  const fetchOrders = async (page: number = 1) => {
    try {
      setLoading(true);
      const response: PaginatedOrdersResponse = await getAllOrders(page, PEDIDOS_CONFIG.limit);
      setOrders(response.data);
      setTotalPages(response.totalPages);
      setTotalItems(response.total);
      setCurrentPage(response.page);
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchOrders(currentPage);
  }, [currentPage]);

  const handleViewDetails = async (order: Order) => {
    setSelectedOrder(order);
    try {
      const details = await getOrderById(order.id);
      setSelectedOrderDetails(details);
      setDetailsModalOpen(true);
    } catch (error) {
      console.error('Erro ao carregar detalhes:', error);
      alert(PEDIDOS_CONFIG.messages.error);
    }
  };

  const filteredOrders = search
    ? orders.filter(o =>
        o.clientName.toLowerCase().includes(search.toLowerCase()) ||
        o.clientPhone.includes(search) ||
        o.id.toLowerCase().includes(search.toLowerCase())
      )
    : orders;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-500">A carregar pedidos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">{PEDIDOS_CONFIG.title}</h1>
        <p className="text-gray-500 mt-1">
          {PEDIDOS_CONFIG.subtitle} • {totalItems} pedidos
        </p>
      </div>

      <div className="relative max-w-sm">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <Input
          placeholder="Buscar por cliente, telefone ou ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
        />
      </div>

      <OrdersTable
        orders={filteredOrders}
        onViewDetails={handleViewDetails}
        onUpdateStatus={(order) => {
          setSelectedOrder(order);
          setStatusModalOpen(true);
        }}
        onCancel={(order) => {
          setSelectedOrder(order);
          setCancelModalOpen(true);
        }}
      />

      {!search && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}

      <OrderDetailsModal
        open={detailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
        order={selectedOrderDetails}
      />

      <UpdateStatusModal
        open={statusModalOpen}
        onClose={() => setStatusModalOpen(false)}
        onSuccess={() => {
          fetchOrders(currentPage);
        }}
        order={selectedOrder}
      />

      <CancelOrderModal
        open={cancelModalOpen}
        onClose={() => setCancelModalOpen(false)}
        onSuccess={() => {
          fetchOrders(currentPage);
        }}
        order={selectedOrder}
      />
    </div>
  );
}
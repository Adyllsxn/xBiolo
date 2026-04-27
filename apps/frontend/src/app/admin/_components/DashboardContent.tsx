"use client";

import { useEffect, useState } from "react";
import { FiCalendar } from "react-icons/fi";
import { getAllProducts, getAllCategories, getAllOrders } from "@/lib/modules";
import type { Product, Category, Order } from "@/lib/modules";
import { DASHBOARD_CONFIG } from "../_constants/dashboard";
import { StatsCards } from "./StatsCards";
import { TicketMedioCard } from "./TicketMedioCard";
import { TotalPedidosCard } from "./TotalPedidosCard";
import { VendasPorMesChart } from "./VendasPorMesChart";
import { ProdutosPorCategoriaChart } from "./ProdutosPorCategoriaChart";
import { StatusPedidosChart } from "./StatusPedidosChart";
import { PedidosRecentesTable } from "./PedidosRecentesTable";

export function DashboardContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsRes, ordersRes, categoriesData] = await Promise.all([
          getAllProducts(1, 100),
          getAllOrders(1, 100),
          getAllCategories(),
        ]);
        setProducts(productsRes.data);
        setOrders(ordersRes.data);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const ordersByMonth = () => {
    const months: Record<string, number> = {};
    orders.forEach((order) => {
      const month = new Date(order.createdAt).toLocaleString("pt-BR", { month: "short" });
      months[month] = (months[month] || 0) + order.total;
    });
    return Object.entries(months).map(([month, total]) => ({ month, total }));
  };

  const productsByCategory = () => {
    const categoryMap: Record<string, number> = {};
    products.forEach((product) => {
      const categoryName = categories.find((c) => c.id === product.categoryId)?.name || "Sem categoria";
      categoryMap[categoryName] = (categoryMap[categoryName] || 0) + 1;
    });
    return Object.entries(categoryMap).map(([name, value]) => ({ name, value }));
  };

  const orderStatus = () => {
    const statusMapData: Record<string, number> = {};
    orders.forEach((order) => {
      statusMapData[order.status] = (statusMapData[order.status] || 0) + 1;
    });
    return Object.entries(statusMapData).map(([name, value]) => ({ name, value }));
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("pt-AO", { style: "currency", currency: "AOA" }).format(value);
  };

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const averageOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;
  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-50 rounded-xl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-500">{DASHBOARD_CONFIG.messages.loading}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{DASHBOARD_CONFIG.title}</h1>
          <p className="text-gray-500 mt-1">{DASHBOARD_CONFIG.subtitle}</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-lg">
          <FiCalendar className="w-4 h-4" />
          <span>{DASHBOARD_CONFIG.messages.updatedNow}</span>
        </div>
      </div>

      <StatsCards
        productsCount={products.length}
        ordersCount={orders.length}
        categoriesCount={categories.length}
        totalRevenue={formatCurrency(totalRevenue)}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TicketMedioCard averageOrderValue={formatCurrency(averageOrderValue)} />
        <TotalPedidosCard ordersCount={orders.length} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <VendasPorMesChart data={ordersByMonth()} formatCurrency={formatCurrency} />
        <ProdutosPorCategoriaChart data={productsByCategory()} />
        <StatusPedidosChart data={orderStatus()} formatCurrency={formatCurrency} />
      </div>

      <PedidosRecentesTable orders={recentOrders} formatCurrency={formatCurrency} />
    </div>
  );
}
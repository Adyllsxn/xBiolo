'use client';

import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import type { ValueType } from 'recharts/types/component/DefaultTooltipContent';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  FiPackage,
  FiShoppingCart,
  FiGrid,
  FiDollarSign,
  FiTrendingUp,
  FiCalendar,
  FiTag,
} from 'react-icons/fi';
import {
  getAllProducts,
  getAllCategories,
  getAllOrders,
} from '@/lib/modules';
import type { Product, Category, Order } from '@/lib/modules';

interface MonthlyData {
  month: string;
  total: number;
}

interface CategoryData {
  name: string;
  value: number;
}

interface StatusData {
  name: string;
  value: number;
}

const statusMap: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  PENDING: { label: 'Pendente', variant: 'secondary' },
  PROCESSING: { label: 'Processando', variant: 'outline' },
  COMPLETED: { label: 'Concluído', variant: 'default' },
  CANCELLED: { label: 'Cancelado', variant: 'destructive' },
};

const statusColors: Record<string, string> = {
  PENDING: '#f59e0b',
  PROCESSING: '#3b82f6',
  COMPLETED: '#10b981',
  CANCELLED: '#ef4444',
};

export default function AdminPage() {
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
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const ordersByMonth = (): MonthlyData[] => {
    const months: Record<string, number> = {};
    orders.forEach(order => {
      const month = new Date(order.createdAt).toLocaleString('pt-BR', { month: 'short' });
      months[month] = (months[month] || 0) + order.total;
    });
    return Object.entries(months).map(([month, total]) => ({ month, total }));
  };

  const productsByCategory = (): CategoryData[] => {
    const categoryMap: Record<string, number> = {};
    products.forEach(product => {
      const categoryName = categories.find(c => c.id === product.categoryId)?.name || 'Sem categoria';
      categoryMap[categoryName] = (categoryMap[categoryName] || 0) + 1;
    });
    return Object.entries(categoryMap).map(([name, value]) => ({ name, value }));
  };

  const orderStatus = (): StatusData[] => {
    const statusMapData: Record<string, number> = {};
    orders.forEach(order => {
      statusMapData[order.status] = (statusMapData[order.status] || 0) + 1;
    });
    return Object.entries(statusMapData).map(([name, value]) => ({ name, value }));
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(value);
  };

  // Formatter corrigido para aceitar ValueType | undefined
  const currencyFormatter = (value: ValueType | undefined): string => {
    if (typeof value === 'number') {
      return formatCurrency(value);
    }
    return String(value ?? '');
  };

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const averageOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;

  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const stats = [
    {
      title: 'Produtos',
      value: products.length,
      icon: FiPackage,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-100',
    },
    {
      title: 'Pedidos',
      value: orders.length,
      icon: FiShoppingCart,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-100',
    },
    {
      title: 'Categorias',
      value: categories.length,
      icon: FiGrid,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-100',
    },
    {
      title: 'Receita Total',
      value: formatCurrency(totalRevenue),
      icon: FiDollarSign,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-100',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-50 rounded-xl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-500">A carregar dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500 mt-1">Visão geral do seu negócio</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-lg">
          <FiCalendar className="w-4 h-4" />
          <span>Atualizado agora</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className={`border-l-4 ${stat.borderColor} shadow-sm hover:shadow-md transition-shadow`}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
              <p className="text-xs text-gray-400 mt-1">Total registado</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Ticket Médio e Tendência */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-100">Ticket Médio</p>
                <p className="text-3xl font-bold mt-2">
                  {formatCurrency(averageOrderValue)}
                </p>
                <p className="text-xs text-orange-100 mt-2">Valor médio por pedido</p>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <FiDollarSign className="w-8 h-8" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-50 rounded-xl">
                <FiTrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total de Pedidos</p>
                <p className="text-2xl font-bold text-gray-800">{orders.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm border border-gray-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FiTrendingUp className="w-5 h-5 text-orange-500" />
              Vendas por Mês
            </CardTitle>
            <CardDescription>Receita mensal acumulada</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={ordersByMonth()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip
                  formatter={currencyFormatter}
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#f97316"
                  strokeWidth={3}
                  dot={{ fill: '#f97316', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-sm border border-gray-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FiTag className="w-5 h-5 text-orange-500" />
              Produtos por Categoria
            </CardTitle>
            <CardDescription>Distribuição de produtos</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={productsByCategory()} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" stroke="#9ca3af" fontSize={12} />
                <YAxis type="category" dataKey="name" stroke="#9ca3af" fontSize={12} width={100} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                />
                <Bar dataKey="value" fill="#f97316" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 shadow-sm border border-gray-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FiShoppingCart className="w-5 h-5 text-orange-500" />
              Status dos Pedidos
            </CardTitle>
            <CardDescription>Distribuição por status</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={orderStatus()}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                  outerRadius={120}
                  dataKey="value"
                  className="cursor-pointer"
                >
                  {orderStatus().map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={statusColors[entry.name] || '#6b7280'}
                      stroke="#fff"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={currencyFormatter}
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Pedidos Recentes */}
      <Card className="shadow-sm border border-gray-100">
        <CardHeader className="bg-gray-50/50 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FiShoppingCart className="w-5 h-5 text-orange-500" />
                Pedidos Recentes
              </CardTitle>
              <CardDescription>Últimos 5 pedidos realizados</CardDescription>
            </div>
            <Badge variant="outline" className="text-orange-600 border-orange-200 bg-orange-50">
              {orders.length} total
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
                <TableHead className="font-semibold text-gray-600">Cliente</TableHead>
                <TableHead className="font-semibold text-gray-600">Telefone</TableHead>
                <TableHead className="font-semibold text-gray-600">Total</TableHead>
                <TableHead className="font-semibold text-gray-600">Status</TableHead>
                <TableHead className="font-semibold text-gray-600">Data</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((order) => (
                <TableRow key={order.id} className="hover:bg-orange-50/30 transition-colors">
                  <TableCell className="font-medium text-gray-800">{order.clientName}</TableCell>
                  <TableCell className="text-gray-600">{order.clientPhone || '-'}</TableCell>
                  <TableCell className="font-semibold text-orange-600">
                    {formatCurrency(order.total)}
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusMap[order.status]?.variant || 'secondary'}>
                      {statusMap[order.status]?.label || order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                  </TableCell>
                </TableRow>
              ))}
              {recentOrders.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-gray-500 py-8">
                    Nenhum pedido encontrado
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
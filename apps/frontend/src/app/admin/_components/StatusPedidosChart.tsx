'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { FiShoppingCart } from 'react-icons/fi';
import { DASHBOARD_CONFIG, type StatusMapKey } from '../_constants/dashboard';
import type { ValueType } from 'recharts/types/component/DefaultTooltipContent';

interface StatusPedidosChartProps {
  data: { name: string; value: number }[];
  formatCurrency: (value: number) => string;
}

export function StatusPedidosChart({ data, formatCurrency }: StatusPedidosChartProps) {
  const currencyFormatter = (value: ValueType | undefined): string => {
    if (typeof value === 'number') {
      return formatCurrency(value);
    }
    return String(value ?? '');
  };

  const getStatusColor = (status: string): string => {
    const statusKey = status as StatusMapKey;
    return DASHBOARD_CONFIG.statusColors[statusKey] || '#6b7280';
  };

  return (
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
              data={data}
              cx="50%"
              cy="50%"
              labelLine={true}
              label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
              outerRadius={120}
              dataKey="value"
              className="cursor-pointer"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={getStatusColor(entry.name)}
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
  );
}
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FiTrendingUp } from 'react-icons/fi';
import type { ValueType } from 'recharts/types/component/DefaultTooltipContent';

interface VendasPorMesChartProps {
  data: { month: string; total: number }[];
  formatCurrency: (value: number) => string;
}

export function VendasPorMesChart({ data, formatCurrency }: VendasPorMesChartProps) {
  const currencyFormatter = (value: ValueType | undefined): string => {
    if (typeof value === 'number') {
      return formatCurrency(value);
    }
    return String(value ?? '');
  };

  return (
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
          <LineChart data={data}>
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
  );
}
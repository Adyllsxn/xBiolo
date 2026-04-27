'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FiTag } from 'react-icons/fi';

interface ProdutosPorCategoriaChartProps {
  data: { name: string; value: number }[];
}

export function ProdutosPorCategoriaChart({ data }: ProdutosPorCategoriaChartProps) {
  return (
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
          <BarChart data={data} layout="vertical">
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
  );
}
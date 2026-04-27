'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DASHBOARD_CONFIG } from '../_constants/dashboard';

interface StatsCardsProps {
  productsCount: number;
  ordersCount: number;
  categoriesCount: number;
  totalRevenue: string;
}

export function StatsCards({ productsCount, ordersCount, categoriesCount, totalRevenue }: StatsCardsProps) {
  const stats = DASHBOARD_CONFIG.stats;
  const values = [productsCount, ordersCount, categoriesCount, totalRevenue];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className={`border-l-4 ${stat.borderColor} shadow-sm hover:shadow-md transition-shadow`}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">{values[index]}</div>
            <p className="text-xs text-gray-400 mt-1">Total registado</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
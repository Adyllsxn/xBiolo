'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FiEdit2, FiTrash2, FiRefreshCw } from 'react-icons/fi';
import { CATEGORIAS_CONFIG } from '../_constants/categorias';
import type { Category } from '@/lib/modules/category';

interface CategoryTableProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
  onRestore: (category: Category) => void;
}

export function CategoryTable({ categories, onEdit, onDelete, onRestore }: CategoryTableProps) {
  const getStatusBadge = (category: Category) => {
    if (category.deletedAt) {
      return <Badge className={CATEGORIAS_CONFIG.status.deleted.className}>{CATEGORIAS_CONFIG.status.deleted.label}</Badge>;
    }
    if (category.active) {
      return <Badge className={CATEGORIAS_CONFIG.status.active.className}>{CATEGORIAS_CONFIG.status.active.label}</Badge>;
    }
    return <Badge className={CATEGORIAS_CONFIG.status.inactive.className}>{CATEGORIAS_CONFIG.status.inactive.label}</Badge>;
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{CATEGORIAS_CONFIG.table.columns.name}</TableHead>
            <TableHead>{CATEGORIAS_CONFIG.table.columns.slug}</TableHead>
            <TableHead>{CATEGORIAS_CONFIG.table.columns.description}</TableHead>
            <TableHead>{CATEGORIAS_CONFIG.table.columns.order}</TableHead>
            <TableHead>{CATEGORIAS_CONFIG.table.columns.status}</TableHead>
            <TableHead className="text-right">{CATEGORIAS_CONFIG.table.columns.actions}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell className="font-medium">{category.name}</TableCell>
              <TableCell>{category.slug}</TableCell>
              <TableCell className="max-w-xs truncate">{category.description || '-'}</TableCell>
              <TableCell>{category.order}</TableCell>
              <TableCell>{getStatusBadge(category)}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(category)}
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                >
                  <FiEdit2 className="w-4 h-4" />
                </Button>
                {category.deletedAt ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRestore(category)}
                    className="text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                  >
                    <FiRefreshCw className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(category)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
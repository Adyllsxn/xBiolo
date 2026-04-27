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
import { FiEdit2, FiTrash2, FiRefreshCw, FiPackage } from 'react-icons/fi';
import { PRODUTOS_CONFIG } from '../_constants/produtos';
import type { Product } from '@/lib/modules/product';
import { getImageUrl } from '@/lib/utils/imageUrl';
import { usePermissions } from '@/lib/modules/auth';

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  onRestore: (product: Product) => void;
  onUpdateStock: (product: Product) => void;
}

export function ProductTable({ products, onEdit, onDelete, onRestore, onUpdateStock }: ProductTableProps) {
  const { canEdit, canDelete, canRestore, canUpdateStock } = usePermissions();

  const getStatusBadge = (product: Product) => {
    if (product.deletedAt) {
      return <Badge className={PRODUTOS_CONFIG.status.deleted.className}>{PRODUTOS_CONFIG.status.deleted.label}</Badge>;
    }
    if (product.active) {
      return <Badge className={PRODUTOS_CONFIG.status.active.className}>{PRODUTOS_CONFIG.status.active.label}</Badge>;
    }
    return <Badge className={PRODUTOS_CONFIG.status.inactive.className}>{PRODUTOS_CONFIG.status.inactive.label}</Badge>;
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{PRODUTOS_CONFIG.table.columns.image}</TableHead>
            <TableHead>{PRODUTOS_CONFIG.table.columns.name}</TableHead>
            <TableHead>{PRODUTOS_CONFIG.table.columns.category}</TableHead>
            <TableHead>{PRODUTOS_CONFIG.table.columns.price}</TableHead>
            <TableHead>{PRODUTOS_CONFIG.table.columns.stock}</TableHead>
            <TableHead>{PRODUTOS_CONFIG.table.columns.status}</TableHead>
            {canEdit && <TableHead className="text-right">{PRODUTOS_CONFIG.table.columns.actions}</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                {product.imageUrl ? (
                  <img
                    src={getImageUrl(product.imageUrl)}
                    alt={product.name}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                    <FiPackage className="w-5 h-5 text-gray-400" />
                  </div>
                )}
              </TableCell>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.category?.name || '-'}</TableCell>
              <TableCell>{product.price.toLocaleString('pt-AO')} Kz</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>{getStatusBadge(product)}</TableCell>
              {canEdit && (
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(product)}
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    title="Editar"
                  >
                    <FiEdit2 className="w-4 h-4" />
                  </Button>
                  {canUpdateStock && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onUpdateStock(product)}
                      className="text-green-600 hover:text-green-700 hover:bg-green-50"
                      title="Atualizar estoque"
                    >
                      <FiRefreshCw className="w-4 h-4" />
                    </Button>
                  )}
                  {product.deletedAt ? (
                    canRestore && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRestore(product)}
                        className="text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                        title="Restaurar"
                      >
                        <FiRefreshCw className="w-4 h-4" />
                      </Button>
                    )
                  ) : (
                    canDelete && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(product)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        title="Excluir"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </Button>
                    )
                  )}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FiPlus, FiSearch } from 'react-icons/fi';
import { getAllProducts, type Product } from '@/lib/modules/product';
import { ProductTable } from './_components/ProductTable';
import { CreateProductModal } from './_modals/CreateProductModal';
import { EditProductModal } from './_modals/EditProductModal';
import { DeleteProductModal } from './_modals/DeleteProductModal';
import { RestoreProductModal } from './_modals/RestoreProductModal';
import { UpdateStockModal } from './_modals/UpdateStockModal';
import { PRODUTOS_CONFIG } from './_constants/produtos';

export default function ProdutosPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [restoreModalOpen, setRestoreModalOpen] = useState(false);
  const [stockModalOpen, setStockModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await getAllProducts(1, 100);
      setProducts(response.data);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.slug.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-500">A carregar produtos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{PRODUTOS_CONFIG.title}</h1>
          <p className="text-gray-500 mt-1">{PRODUTOS_CONFIG.subtitle}</p>
        </div>
        <Button onClick={() => setCreateModalOpen(true)} className="bg-orange-500 hover:bg-orange-600">
          <FiPlus className="w-4 h-4 mr-2" />
          {PRODUTOS_CONFIG.buttons.create.text}
        </Button>
      </div>

      <div className="relative max-w-sm">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <Input
          placeholder="Buscar produtos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
        />
      </div>

      <ProductTable
        products={filteredProducts}
        onEdit={(product) => {
          setSelectedProduct(product);
          setEditModalOpen(true);
        }}
        onDelete={(product) => {
          setSelectedProduct(product);
          setDeleteModalOpen(true);
        }}
        onRestore={(product) => {
          setSelectedProduct(product);
          setRestoreModalOpen(true);
        }}
        onUpdateStock={(product) => {
          setSelectedProduct(product);
          setStockModalOpen(true);
        }}
      />

      <CreateProductModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSuccess={fetchProducts}
      />

      <EditProductModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSuccess={fetchProducts}
        product={selectedProduct}
      />

      <DeleteProductModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onSuccess={fetchProducts}
        product={selectedProduct}
      />

      <RestoreProductModal
        open={restoreModalOpen}
        onClose={() => setRestoreModalOpen(false)}
        onSuccess={fetchProducts}
        product={selectedProduct}
      />

      <UpdateStockModal
        open={stockModalOpen}
        onClose={() => setStockModalOpen(false)}
        onSuccess={fetchProducts}
        product={selectedProduct}
      />
    </div>
  );
}
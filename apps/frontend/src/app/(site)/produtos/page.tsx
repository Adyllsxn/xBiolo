'use client';

import { useState, useEffect } from 'react';
import { FiSearch, FiGrid, FiList, FiFilter, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ProductCard from './_components/ProductCard';
import { products } from '@/lib/mock/products';

const ITEMS_PER_PAGE = 12;

export default function ProdutosPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Categorias únicas
  const categories = ['all', ...new Set(products.map(p => p.category))];

  // Filtrar produtos
  useEffect(() => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFilteredProducts(filtered);
    setCurrentPage(1); // Resetar página quando filtrar
  }, [searchTerm, selectedCategory]);

  // Paginação
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Catálogo de produtos</h1>
        <p className="text-gray-500">Encontre o produto perfeito para você</p>
      </div>

      {/* Search e Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="O que você está procurando?"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
          />
        </div>

        {/* Filtros Desktop */}
        <div className="hidden md:flex gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg capitalize transition ${
                selectedCategory === cat
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat === 'all' ? 'Todos' : cat}
            </button>
          ))}
        </div>

        {/* View Mode + Mobile Filter */}
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition ${
              viewMode === 'grid' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'
            }`}
          >
            <FiGrid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition ${
              viewMode === 'list' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'
            }`}
          >
            <FiList className="w-5 h-5" />
          </button>

          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="md:hidden p-2 rounded-lg bg-gray-100 text-gray-600"
          >
            <FiFilter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Filtros Mobile */}
      {isFilterOpen && (
        <div className="md:hidden flex flex-wrap gap-2 mb-6 p-4 bg-gray-50 rounded-lg">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setIsFilterOpen(false);
              }}
              className={`px-3 py-1 rounded-full text-sm capitalize transition ${
                selectedCategory === cat
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-gray-600 border'
              }`}
            >
              {cat === 'all' ? 'Todos' : cat}
            </button>
          ))}
        </div>
      )}

      {/* Resultados */}
      <div className="text-sm text-gray-500 mb-4">
        Mostrando {paginatedProducts.length} de {filteredProducts.length} produtos
        {searchTerm && ` para "${searchTerm}"`}
      </div>

      {/* Grid/Lista de produtos */}
      {paginatedProducts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500">Nenhum produto encontrado</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}
            className="mt-4 text-orange-500 hover:underline"
          >
            Limpar filtros
          </button>
        </div>
      ) : (
        <>
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6'
                : 'space-y-4'
            }
          >
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} viewMode={viewMode} />
            ))}
          </div>

          {/* Paginação */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-10">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed hover:border-orange-500 transition"
              >
                <FiChevronLeft className="w-5 h-5" />
              </button>
              
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`w-10 h-10 rounded-lg transition ${
                      currentPage === page
                        ? 'bg-orange-500 text-white'
                        : 'border hover:border-orange-500'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed hover:border-orange-500 transition"
              >
                <FiChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
import { Suspense } from 'react';
import ProdutosContent from './_components/ProdutosContent';

export default function ProdutosPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>
        <p className="mt-4 text-gray-500">A carregar produtos...</p>
      </div>
    }>
      <ProdutosContent />
    </Suspense>
  );
}
// app/(site)/produtos/[slug]/page.tsx
import { products } from '@/lib/mock/products';
import ProductDetail from '../_components/ProductDetail';

// Gerar todos os slugs possíveis para build estático
export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProdutoDetalhePage({
  params,
}: {
  params: { slug: string };
}) {
  // Aguardar params (Next.js 15+)
  const { slug } = await params;
  
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    console.log('Produto não encontrado para slug:', slug);
    console.log('Slugs disponíveis:', products.map(p => p.slug));
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
        <p className="text-gray-500 mb-4">Slug: {slug}</p>
        <a href="/produtos" className="text-orange-500 hover:underline">
          Voltar ao catálogo
        </a>
      </div>
    );
  }

  return <ProductDetail product={product} />;
}
import Link from 'next/link';
import { getProductBySlug } from '@/lib/modules/product/services/getProductBySlug.service';
import ProductDetail from '../_components/ProductDetail';

export default async function ProdutoDetalhePage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
        <Link href="/produtos" className="text-orange-500 hover:underline">
          Voltar ao catálogo
        </Link>
      </div>
    );
  }

  return (
    <ProductDetail
      product={{
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        imageUrl: product.imageUrl || '/images/placeholder.jpg',
        description: product.description || '',
        variations: product.variations,
        stock: product.stock,
      }}
    />
  );
}
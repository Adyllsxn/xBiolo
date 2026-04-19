import Hero from './_components/Hero';
import Categories from './_components/Categories';
import FeaturedProducts from './_components/FeaturedProducts';
import CTA from './_components/CTA';

export default function HomePage() {
  return (
    <div>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <CTA />
    </div>
  );
}
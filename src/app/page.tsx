import AllProducts from '@/components/home/AllProducts';
import Hero from '@/components/home/Hero';
import PriceSection from '@/components/home/PriceSection';
import { getProducts } from '@/products';

export default async function HomePage() {
	const products = await getProducts();

	return (
		<main className="mx-auto w-full max-w-6xl space-y-10 px-4 py-6 sm:px-6 lg:px-8">
			<Hero />

			<PriceSection
				title="আজ দাম বেড়েছে"
				direction="up"
				products={products}
			/>

			<PriceSection
				title="আজ দাম কমেছে"
				direction="down"
				products={products}
			/>

			<AllProducts products={products} />
		</main>
	);
}

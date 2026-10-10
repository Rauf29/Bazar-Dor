import type { Product } from '@/products';
import ProductCard from './ProductCard';

type Props = {
	title: string;
	direction: 'up' | 'down';
	products: Product[];
};

export default function PriceSection({ title, direction, products }: Props) {
	const filteredProducts = products
		.filter(product => product.direction === direction)
		.sort((a, b) => Math.abs(b.change) - Math.abs(a.change))
		.slice(0, 6);

	const isUp = direction === 'up';

	return (
		<section>
			<h2 className="mb-4 flex items-center gap-2 text-xl font-extrabold text-[#202821]">
				<span className={isUp ? 'text-red-500' : 'text-[#07964a]'}>
					{isUp ? '▲' : '▼'}
				</span>
				{title}
			</h2>

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{filteredProducts.map(product => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</section>
	);
}

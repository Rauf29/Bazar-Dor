import ProductCard from './ProductCard';
import { getProducts } from './products';

export default async function AllProducts() {
	const products = await getProducts();
	return (
		<section id="all-products" className="scroll-mt-36">
			<div className="mb-4">
				<h2 className="text-lg font-extrabold text-[#202821]">
					সব পণ্য
				</h2>
				<p className="mt-1 text-xs text-[#68746c]">
					মোট {products.length.toLocaleString('bn-BD')}টি পণ্য
				</p>
			</div>

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{products.map(product => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</section>
	);
}

import { getProducts } from '@/products';
import Link from 'next/link';
import MarqueeText from 'react-marquee-text';
import 'react-marquee-text/dist/styles.css';

const Marquee = async () => {
	const products = await getProducts();

	if (!products.length) return null;

	return (
		<div className="border-b border-[#e2e9e3] bg-white/70 text-[#202821]">
			<div className="mx-auto flex w-full">
				<MarqueeText className="py-2" direction="right" duration={20}>
					{products.map(product => (
						<Link
							key={product.id}
							href={`/products/${product.slug}`}
							className="whitespace-nowrap text-xs hover:text-[#078b45] sm:text-sm"
						>
							<span className="mx-2">
								{product.image} {product.name}
							</span>

							<span>
								{product.price} টাকা/
								{product.unit === 'kg' ? 'কেজি' : product.unit}
							</span>

							<span
								className={`mx-2 font-semibold ${
									product.direction === 'up'
										? 'text-red-500'
										: product.direction === 'down'
											? 'text-[#07964a]'
											: 'text-gray-500'
								}`}
							>
								{product.direction === 'up'
									? '▲'
									: product.direction === 'down'
										? '▼'
										: '—'}{' '}
								{product.change}%
							</span>

							<span className="mx-3 text-[#cbd5ce]">|</span>
						</Link>
					))}
				</MarqueeText>
			</div>
		</div>
	);
};

export default Marquee;

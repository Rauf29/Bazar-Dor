import Link from 'next/link';
import MarqueeText from 'react-marquee-text';
import 'react-marquee-text/dist/styles.css';

interface Product {
	id: number;
	slug: string;
	nameBn: string;
	categoryIcon: string;
	unit: string;
	today: number;
	change: {
		dir: string;
		pct: number;
	};
}

const Marquee = async () => {
	let products: Product[] = [];

	try {
		const res = await fetch(
			'https://api.abcz.workers.dev/api/bazardor/products',
			{ next: { revalidate: 300 } },
		);

		if (res.ok) {
			products = await res.json();
		}
	} catch {
		products = [];
	}

	if (!products.length) return null;

	return (
		<div className="border-b border-[#e2e9e3] bg-white/70 text-[#202821]">
			<div className="mx-auto flex w-full">
				<MarqueeText className="py-2" direction="right" duration={15}>
					{products.map(product => (
						<Link
							key={product.id}
							href={`/products/${product.slug}`}
							className="whitespace-nowrap text-xs hover:text-[#078b45] sm:text-sm"
						>
							<span className="mx-2">
								{product.categoryIcon} {product.nameBn}
							</span>

							<span>
								{product.today} টাকা/
								{product.unit === 'kg' ? 'কেজি' : product.unit}
							</span>

							<span
								className={`mx-2 font-semibold ${
									product.change.dir === 'up'
										? 'text-red-500'
										: product.change.dir === 'down'
											? 'text-[#07964a]'
											: 'text-gray-500'
								}`}
							>
								{product.change.dir === 'up'
									? '▲'
									: product.change.dir === 'down'
										? '▼'
										: '—'}{' '}
								{product.change.pct}%
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

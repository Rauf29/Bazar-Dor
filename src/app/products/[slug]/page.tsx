import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCategories, getProducts, UNIT_LABELS } from '@/products';

export async function generateStaticParams() {
	const products = await getProducts();
	return products.map(product => ({ slug: product.slug }));
}

const ProductPage = async ({
	params,
}: {
	params: Promise<{ slug: string }>;
}) => {
	const { slug } = await params;

	const [products, categories] = await Promise.all([
		getProducts(),
		getCategories(),
	]);

	const product = products.find(item => item.slug === slug);

	if (!product) {
		notFound();
	}

	const category = categories.find(item => item.slug === product.category);
	const unitLabel = UNIT_LABELS[product.unit] ?? `প্রতি ${product.unit}`;
	const diff = product.price - product.yesterday;
	const trendWord =
		product.direction === 'up'
			? 'বেড়েছে'
			: product.direction === 'down'
				? 'কমেছে'
				: 'অপরিবর্তিত আছে';

	const lowest = product.markets.length
		? Math.min(...product.markets.map(item => item.min))
		: product.price;
	const highest = product.markets.length
		? Math.max(...product.markets.map(item => item.max))
		: product.price;

	return (
		<main className="mx-auto w-full max-w-6xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
			<nav className="flex items-center gap-2 text-[14px] text-[#68746c]">
				<Link href="/" className="hover:text-[#078b45]">
					হোম
				</Link>
				<span>&gt;</span>
				<Link
					href={`/category/${product.category}`}
					className="hover:text-[#078b45]"
				>
					{category ? category.name : product.category}
				</Link>
				<span>&gt;</span>
				<span className="font-semibold text-[#202821]">
					{product.name}
				</span>
			</nav>

			<div className="rounded-2xl border border-[#dfe8e0] bg-white p-5">
				<div className="flex items-start justify-between gap-4">
					<div className="flex items-center gap-4">
						<span
							aria-hidden="true"
							className="flex size-14 items-center justify-center rounded-2xl bg-[#eff5f0] text-4xl"
						>
							{product.image}
						</span>
						<div>
							<h1 className="text-2xl font-extrabold text-[#202821]">
								{product.name}
							</h1>
							<p className="mt-1 text-[14px] text-[#68746c]">
								{unitLabel} ·{' '}
								{category ? category.name : product.category}
							</p>
							<p className="mt-1 text-[14px] text-[#68746c]">
								গতকালের তুলনায় আজ দাম {trendWord}{' '}
								{Math.abs(diff).toLocaleString('bn-BD')} টাকা
							</p>
						</div>
					</div>

					<div className="shrink-0 rounded-2xl bg-[#f9fcfa] p-4 text-center">
						<p className="text-[14px] text-[#68746c]">আজকের দাম</p>
						<p className="mt-1 text-2xl font-extrabold text-[#202821]">
							{product.price.toLocaleString('bn-BD')}
						</p>
						<p className="text-[14px] text-[#68746c]">
							{unitLabel}
						</p>
						<p
							className={`mt-1 text-sm font-bold ${product.direction === 'up' ? 'text-red-500' : product.direction === 'down' ? 'text-[#078b45]' : 'text-[#68746c]'}`}
						>
							{product.direction === 'up'
								? '▲'
								: product.direction === 'down'
									? '▼'
									: '—'}{' '}
							{product.change.toLocaleString('bn-BD')}%
						</p>
					</div>
				</div>
			</div>

			{product.markets.length > 0 && (
				<section className="rounded-2xl border border-[#dfe8e0] bg-white p-5">
					<h2 className="text-xl font-extrabold text-[#202821]">
						দামের সারসংক্ষেপ
					</h2>

					<div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
						<div className="rounded-xl border border-[#e5ece6] p-4">
							<p className="text-[14px] text-[#68746c]">সর্বনিম্ন দাম</p>
							<p className="mt-1 text-xl font-extrabold text-[#078b45]">
								{lowest.toLocaleString('bn-BD')}{' '}
								<span className="text-sm font-medium">টাকা</span>
							</p>
							<p className="mt-1 text-[14px] text-[#68746c]">
								সবচেয়ে কম দামের বাজার
							</p>
						</div>

						<div className="rounded-xl border border-[#e5ece6] p-4">
							<p className="text-[14px] text-[#68746c]">সর্বোচ্চ দাম</p>
							<p className="mt-1 text-xl font-extrabold text-red-500">
								{highest.toLocaleString('bn-BD')}{' '}
								<span className="text-sm font-medium">টাকা</span>
							</p>
							<p className="mt-1 text-[14px] text-[#68746c]">
								সবচেয়ে বেশি দামের বাজার
							</p>
						</div>

						<div className="rounded-xl border border-[#e5ece6] p-4">
							<p className="text-[14px] text-[#68746c]">গড় দাম</p>
							<p className="mt-1 text-xl font-extrabold text-[#078b45]">
								{product.price.toLocaleString('bn-BD')}{' '}
								<span className="text-sm font-medium">টাকা</span>
							</p>
							<p className="mt-1 text-[14px] text-[#68746c]">
								{unitLabel}-এর হিসাবে
							</p>
						</div>
					</div>

					<h3 className="mt-6 text-lg font-extrabold text-[#202821]">
						বাজারভিত্তিক আজকের দাম
					</h3>

					<div className="mt-3 overflow-x-auto">
						<table className="w-full text-base">
							<thead>
								<tr className="border-b border-[#e5ece6] text-left text-[14px] text-[#68746c]">
									<th className="py-2 pr-4 font-medium">
										বাজার
									</th>
									<th className="py-2 pr-4 font-medium">
										বিভাগ
									</th>
									<th className="py-2 pr-4 font-medium">
										সর্বনিম্ন
									</th>
									<th className="py-2 pr-4 font-medium">
										সর্বোচ্চ
									</th>
									<th className="py-2 text-right font-medium">
										গড়
									</th>
								</tr>
							</thead>
							<tbody>
								{product.markets.map(item => (
									<tr
										key={item.market}
										className="border-b border-[#eef3ef] text-[#202821] last:border-0"
									>
										<td className="py-2.5 pr-4 text-[14px] font-semibold">
											{item.market}
										</td>
										<td className="py-2.5 pr-4 text-[14px] text-[#68746c]">
											{item.division}
										</td>
										<td className="py-2.5 pr-4 text-[14px]">
											{item.min.toLocaleString('bn-BD')}{' '}
											টাকা
										</td>
										<td className="py-2.5 pr-4 text-[14px]">
											{item.max.toLocaleString('bn-BD')}{' '}
											টাকা
										</td>
										<td className="py-2.5 text-right text-[14px] font-bold">
											{Math.round(
												(item.min + item.max) / 2,
											).toLocaleString('bn-BD')}{' '}
											টাকা
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</section>
			)}
		</main>
	);
};

export default ProductPage;

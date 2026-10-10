import ProductCard from '@/components/home/ProductCard';
import type { Product } from '@/products';
import Link from 'next/link';

export default async function SortSection({
	slug,
	products,
	searchParams,
}: {
	slug: string;
	products: Product[];
	searchParams: Promise<{ sort?: string }>;
}) {
	const { sort } = await searchParams;

	const sorted = [...products].sort((a, b) => {
		if (sort === 'asc') return a.price - b.price;
		if (sort === 'desc') return b.price - a.price;
		return 0;
	});

	return (
		<section className="space-y-4">
			<div className="rounded-2xl border border-[#dfe8e0] bg-white p-4">
				<div className="flex items-center justify-between gap-2">
					<p className="text-sm text-[#68746c]">
						মোট {products.length.toLocaleString('bn-BD')}টি পণ্য
						দেখানো হচ্ছে
					</p>

					<div className="flex items-center gap-2 text-sm text-[#68746c]">
						<span className="text-sm">সাজান</span>
						<details className="relative">
							<summary className="cursor-pointer list-none rounded-lg border border-[#dfe8e0] bg-white px-3 py-2 text-sm font-semibold text-[#202821] [&::-webkit-details-marker]:hidden">
								{sort === 'asc' ? 'দাম: কম থেকে বেশি' : sort === 'desc' ? 'দাম: বেশি থেকে কম' : 'ডিফল্ট'} ▾
							</summary>
							<div className="absolute right-0 top-full z-10 mt-2 w-44 rounded-xl border border-[#dfe8e0] bg-white p-1 shadow-xl">
								<Link
									href={`/category/${slug}`}
									className={`block rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-[#edf3ee] ${!sort ? 'font-bold text-[#078b45]' : 'text-[#202821]'}`}
								>
									{!sort && '✓ '}
									ডিফল্ট
								</Link>
								<Link
									href={`/category/${slug}?sort=asc`}
									className={`block rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-[#edf3ee] ${sort === 'asc' ? 'font-bold text-[#078b45]' : 'text-[#202821]'}`}
								>
									{sort === 'asc' && '✓ '}
									দাম: কম থেকে বেশি
								</Link>
								<Link
									href={`/category/${slug}?sort=desc`}
									className={`block rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-[#edf3ee] ${sort === 'desc' ? 'font-bold text-[#078b45]' : 'text-[#202821]'}`}
								>
									{sort === 'desc' && '✓ '}
									দাম: বেশি থেকে কম
								</Link>
							</div>
						</details>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{sorted.map(product => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</section>
	);
}

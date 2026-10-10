import ProductCard from '@/components/home/ProductCard';
import { getCategories, getProductsByCategory } from '@/products';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const CategoryPage = async ({
	params,
	searchParams,
}: {
	params: Promise<{ slug: string }>;
	searchParams: Promise<{ sort?: string }>;
}) => {
	const { slug } = await params;
	const { sort } = await searchParams;

	const categories = await getCategories();
	const category = categories.find(item => item.slug === slug);

	if (!category) {
		notFound();
	}

	const products = await getProductsByCategory(slug);

	const sorted = [...products].sort((a, b) => {
		if (sort === 'asc') return a.price - b.price;
		if (sort === 'desc') return b.price - a.price;
		return 0;
	});

	return (
		<main className="mx-auto w-full max-w-6xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
			<div className="rounded-2xl border border-[#dfe8e0] bg-white p-5">
				<div className="flex items-center gap-4">
					<span
						aria-hidden="true"
						className="flex size-14 items-center justify-center rounded-2xl bg-[#eff5f0] text-4xl"
					>
						{category.icon}
					</span>
					<div>
						<h1 className="text-2xl font-extrabold text-[#202821]">
							{category.name}
						</h1>
						<p className="mt-1 text-sm text-[#68746c]">
							{products.length.toLocaleString('bn-BD')}টি পণ্যের
							আজকের দাম ও পরিবর্তন
						</p>
					</div>
				</div>
			</div>

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
		</main>
	);
};

export default CategoryPage;

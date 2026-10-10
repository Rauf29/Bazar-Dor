import { getCategories, getProductsByCategory } from '@/products';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import SortSection from './SortSection';

export async function generateStaticParams() {
	const categories = await getCategories();
	return categories.map(category => ({ slug: category.slug }));
}

const CategoryPage = async ({
	params,
	searchParams,
}: {
	params: Promise<{ slug: string }>;
	searchParams: Promise<{ sort?: string }>;
}) => {
	const { slug } = await params;

	const categories = await getCategories();
	const category = categories.find(item => item.slug === slug);

	if (!category) {
		notFound();
	}

	const products = await getProductsByCategory(slug);

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

			<Suspense
				fallback={
					<div className="h-40 animate-pulse rounded-2xl border border-[#dfe8e0] bg-white" />
				}
			>
				<SortSection
					slug={slug}
					products={products}
					searchParams={searchParams}
				/>
			</Suspense>
		</main>
	);
};

export default CategoryPage;

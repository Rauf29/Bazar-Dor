'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Category } from '@/products';

export default function CategoryNav({
	categories,
}: {
	categories: Category[];
}) {
	const pathname = usePathname() ?? '';

	return (
		<nav className="border-b border-[#e2e9e3]">
			<div className="mx-auto flex h-12 max-w-6xl items-center gap-1 overflow-x-auto px-4 sm:px-6 lg:px-8">
				{categories.map(category => {
					const active =
						pathname === `/category/${category.slug}` ||
						pathname.startsWith(`/category/${category.slug}/`);

					return (
						<Link
							key={category.slug}
							href={`/category/${category.slug}`}
							aria-current={active ? 'page' : undefined}
							className={`flex h-9 shrink-0 items-center gap-1.5 rounded-lg px-3 text-sm font-medium transition-colors ${
								active
									? 'bg-[#078b45] text-white'
									: 'text-[#354139] hover:bg-[#edf3ee] hover:text-[#078b45]'
							}`}
						>
							<span aria-hidden="true">{category.icon}</span>
							{category.name}
						</Link>
					);
				})}
			</div>
		</nav>
	);
}

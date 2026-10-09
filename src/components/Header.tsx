import { getCategories } from '@/products';
import Image from 'next/image';
import Link from 'next/link';

export default async function Header() {
	const date = new Date().toLocaleDateString('bn-BD', {
		dateStyle: 'full',
	});
	const categories = await getCategories();
	return (
		<header className="sticky top-0 z-50 w-full bg-[#f9fcfa] text-[#202821]">
			<div className="border-b border-[#e5ece6]">
				<div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
					<Link
						href="/"
						className="flex shrink-0 items-center gap-2"
					>
						<span className="flex size-10 items-center justify-center rounded-xl bg-[#078b45] text-white">
							<Image
								src="/logo-icon.png"
								alt="বাজার দর"
								width={20}
								height={20}
							/>
						</span>

						<span className="flex flex-col">
							<span className="text-xl font-extrabold leading-tight tracking-tight sm:text-[22px]">
								বাজার দর
							</span>
							<span className="mt-0.5 text-[10px] leading-4 text-[#68746c] sm:text-[11px]">
								{date}
							</span>
						</span>
					</Link>

					<div className="flex items-center gap-4">
						<Link
							href="/sign-in"
							className="text-sm font-semibold transition-colors hover:text-[#078b45]"
						>
							সাইন ইন
						</Link>

						<Link
							href="/sign-up"
							className="rounded-lg bg-[#078b45] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_3px_0_#066a36] transition-colors hover:bg-[#06783c]"
						>
							সাইন আপ
						</Link>
					</div>
				</div>
			</div>

			<nav className="border-b border-[#e2e9e3]">
				<div className="mx-auto flex h-12 max-w-6xl items-center gap-1 overflow-x-auto px-4 sm:px-6 lg:px-8">
					{categories.map(category => (
						<Link
							key={category.slug}
							href={`/category/${category.slug}`}
							className="flex h-9 shrink-0 items-center gap-1.5 rounded-lg px-3 text-[13px] font-medium text-[#354139] transition-colors hover:bg-[#edf3ee] hover:text-[#078b45]"
						>
							<span aria-hidden="true">{category.icon}</span>
							{category.name}
						</Link>
					))}
				</div>
			</nav>
		</header>
	);
}

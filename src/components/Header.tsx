import { getCategories } from '@/products';
import Image from 'next/image';
import Link from 'next/link';
import AccountMenu from './AccountMenu';
import CategoryNav from './CategoryNav';
import CurrentDate from './CurrentDate';

export default async function Header() {
	const categories = await getCategories();
	return (
		<header className="sticky top-0 z-50 w-full bg-[#f9fcfa] text-[#202821]">
			<div className="border-b border-[#e5ece6]">
				<div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
					<Link href="/" className="flex shrink-0 items-center gap-2">
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
							<span className="mt-0.5 text-xs leading-4 text-[#68746c]">
								<CurrentDate />
							</span>
						</span>
					</Link>

					<AccountMenu />
				</div>
			</div>

			<CategoryNav categories={categories} />
		</header>
	);
}

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const categories = [
	{ name: 'চাল', icon: '🍚', slug: 'chal' },
	{ name: 'ডাল', icon: '🫘', slug: 'dal' },
	{ name: 'তেল', icon: '🛢️', slug: 'tel' },
	{ name: 'সবজি', icon: '🥬', slug: 'shobji' },
	{ name: 'মাছ', icon: '🐟', slug: 'mach' },
	{ name: 'মাংস', icon: '🍗', slug: 'mangsho' },
	{ name: 'ডিম-দুধ', icon: '🥛', slug: 'dim-dudh' },
	{ name: 'মসলা', icon: '🌶️', slug: 'mosla' },
];

const user = {
	name: 'Rezwan Ahmed',
	email: 'rezwanahmed@gmail.com',
};

export default function Header() {
	const pathname = usePathname() ?? '';

	const [isLoggedIn, setIsLoggedIn] = useState(true);
	const [profileOpen, setProfileOpen] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect -- close menus on route change
		setProfileOpen(false);
		setMobileMenuOpen(false);
	}, [pathname]);

	const isActive = (slug: string) =>
		pathname === `/category/${slug}` ||
		pathname.startsWith(`/category/${slug}/`);

	return (
		<header className="sticky top-0 z-50 w-full bg-[#f9fcfa] text-[#202821]">
			{/* Main header */}
			<div className="border-b border-[#e5ece6]">
				<div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
					{/* Logo */}
					<Link
						href="/"
						aria-label="বাজার দর হোম"
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
								সর্বশেষ বাজারদর
							</span>
						</span>
					</Link>

					{/* Desktop account */}
					<div className="hidden items-center gap-4 sm:flex">
						{isLoggedIn ? (
							<div className="relative">
								<button
									type="button"
									onClick={() =>
										setProfileOpen(open => !open)
									}
									aria-expanded={profileOpen}
									className="flex items-center gap-2 rounded-xl px-2 py-1.5 transition-colors hover:bg-[#edf3ee]"
								>
									<span className="flex size-9 items-center justify-center rounded-full bg-[#e5f3e9] text-sm font-bold text-[#078b45]">
										{user.name.charAt(0)}
									</span>

									<span className="text-sm font-semibold">
										{user.name.split(' ')[0]}
									</span>

									<svg
										viewBox="0 0 20 20"
										fill="currentColor"
										className={`size-4 transition-transform ${
											profileOpen ? 'rotate-180' : ''
										}`}
										aria-hidden="true"
									>
										<path
											fillRule="evenodd"
											d="M5.2 7.5a.75.75 0 0 1 1.05 0L10 11.2l3.75-3.7a.75.75 0 1 1 1.05 1.06l-4.28 4.23a.75.75 0 0 1-1.05 0L5.2 8.55a.75.75 0 0 1 0-1.05Z"
											clipRule="evenodd"
										/>
									</svg>
								</button>

								{profileOpen && (
									<div className="absolute right-0 top-full mt-2 w-64 rounded-2xl border border-[#e0e8e1] bg-white p-4 shadow-xl">
										<p className="truncate text-sm font-bold">
											{user.name}
										</p>
										<p className="mt-1 break-all text-xs text-[#68746c]">
											{user.email}
										</p>

										<div className="my-3 border-t border-[#e8eee9]" />

										<Link
											href="/profile"
											className="block rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-[#edf3ee]"
										>
											আমার প্রোফাইল
										</Link>

										<button
											type="button"
											onClick={() => {
												setIsLoggedIn(false);
												setProfileOpen(false);
											}}
											className="mt-1 w-full rounded-lg px-3 py-2.5 text-left text-sm text-red-500 transition-colors hover:bg-red-50"
										>
											সাইন আউট
										</button>
									</div>
								)}
							</div>
						) : (
							<>
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
							</>
						)}
					</div>

					{/* Mobile actions */}
					<div className="relative flex items-center gap-2 sm:hidden">
						{isLoggedIn && (
							<button
								type="button"
								onClick={() => setProfileOpen(open => !open)}
								aria-label="প্রোফাইল মেনু"
								aria-expanded={profileOpen}
								className="flex size-9 items-center justify-center rounded-full bg-[#e5f3e9] text-sm font-bold text-[#078b45]"
							>
								{user.name.charAt(0)}
							</button>
						)}

						{!isLoggedIn && (
							<Link
								href="/sign-in"
								className="rounded-lg bg-[#078b45] px-3 py-2 text-xs font-semibold text-white"
							>
								সাইন ইন
							</Link>
						)}

						<button
							type="button"
							onClick={() => setMobileMenuOpen(open => !open)}
							aria-label={
								mobileMenuOpen ? 'মেনু বন্ধ করুন' : 'মেনু খুলুন'
							}
							aria-expanded={mobileMenuOpen}
							className="flex size-9 items-center justify-center rounded-lg border border-[#e0e8e1] transition-colors hover:bg-[#edf3ee]"
						>
							{mobileMenuOpen ? (
								<svg
									viewBox="0 0 24 24"
									fill="none"
									className="size-5"
									aria-hidden="true"
								>
									<path
										d="m6 6 12 12M18 6 6 18"
										stroke="currentColor"
										strokeWidth="1.8"
										strokeLinecap="round"
									/>
								</svg>
							) : (
								<svg
									viewBox="0 0 24 24"
									fill="none"
									className="size-5"
									aria-hidden="true"
								>
									<path
										d="M4 7h16M4 12h16M4 17h16"
										stroke="currentColor"
										strokeWidth="1.8"
										strokeLinecap="round"
									/>
								</svg>
							)}
						</button>

						{profileOpen && isLoggedIn && (
							<div className="absolute right-11 top-11 z-50 w-64 rounded-2xl border border-[#e0e8e1] bg-white p-4 shadow-xl">
								<p className="truncate text-sm font-bold">
									{user.name}
								</p>
								<p className="mt-1 break-all text-xs text-[#68746c]">
									{user.email}
								</p>

								<Link
									href="/profile"
									className="mt-3 block rounded-lg px-3 py-2.5 text-sm hover:bg-[#edf3ee]"
								>
									আমার প্রোফাইল
								</Link>

								<button
									type="button"
									onClick={() => {
										setIsLoggedIn(false);
										setProfileOpen(false);
									}}
									className="mt-1 w-full rounded-lg px-3 py-2.5 text-left text-sm text-red-500 hover:bg-red-50"
								>
									সাইন আউট
								</button>
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Desktop category navigation */}
			<nav
				aria-label="পণ্যের ক্যাটাগরি"
				className="hidden border-b border-[#e2e9e3] md:block"
			>
				<div className="mx-auto flex h-12 max-w-6xl items-center gap-1 overflow-x-auto px-4 sm:px-6 lg:px-8">
					{categories.map(category => (
						<Link
							key={category.slug}
							href={`/category/${category.slug}`}
							aria-current={
								isActive(category.slug) ? 'page' : undefined
							}
							className={`flex h-9 shrink-0 items-center gap-1.5 rounded-lg px-3 text-[13px] font-medium transition-colors ${
								isActive(category.slug)
									? 'bg-[#078b45] text-white'
									: 'text-[#354139] hover:bg-[#edf3ee] hover:text-[#078b45]'
							}`}
						>
							<span aria-hidden="true">{category.icon}</span>
							{category.name}
						</Link>
					))}
				</div>
			</nav>

			{/* Mobile category navigation */}
			{mobileMenuOpen && (
				<nav
					aria-label="মোবাইল ক্যাটাগরি"
					className="border-b border-[#e2e9e3] bg-[#f9fcfa] px-4 py-3 md:hidden"
				>
					<div className="grid grid-cols-2 gap-2">
						{categories.map(category => (
							<Link
								key={category.slug}
								href={`/category/${category.slug}`}
								aria-current={
									isActive(category.slug) ? 'page' : undefined
								}
								className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 text-sm transition-colors ${
									isActive(category.slug)
										? 'border-[#078b45] bg-[#e8f5ec] text-[#078b45]'
										: 'border-[#e5ece6] hover:bg-[#edf3ee]'
								}`}
							>
								<span aria-hidden="true">{category.icon}</span>
								{category.name}
							</Link>
						))}

						{!isLoggedIn && (
							<Link
								href="/sign-up"
								className="col-span-2 mt-1 rounded-lg bg-[#078b45] px-4 py-3 text-center text-sm font-semibold text-white"
							>
								অ্যাকাউন্ট তৈরি করুন
							</Link>
						)}
					</div>
				</nav>
			)}
		</header>
	);
}

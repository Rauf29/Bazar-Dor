'use client';

import { authClient } from '@/lib/auth-client';
import Image from 'next/image';
import Link from 'next/link';

export default function AccountMenu() {
	const { data: session, isPending } = authClient.useSession();

	if (isPending) {
		return <div className="h-9 w-24" />;
	}

	const user = session?.user;

	if (!user) {
		return (
			<div className="flex items-center gap-4">
				<Link
					href="/sign-in"
					className="text-base font-semibold transition-colors hover:text-[#078b45]"
				>
					সাইন ইন
				</Link>
				<Link
					href="/sign-up"
					className="rounded-lg bg-[#078b45] px-5 py-2.5 text-base font-semibold text-white shadow-[0_3px_0_#066a36] transition-colors hover:bg-[#06783c]"
				>
					সাইন আপ
				</Link>
			</div>
		);
	}

	const signOut = async () => {
		await authClient.signOut();
	};

	return (
		<details className="relative">
			<summary className="flex cursor-pointer list-none items-center gap-2 rounded-xl px-2 py-1.5 transition-colors hover:bg-[#edf3ee] [&::-webkit-details-marker]:hidden">
				<span className="flex size-9 items-center justify-center overflow-hidden rounded-full bg-[#e5f3e9] text-sm font-bold text-[#078b45]">
					{user.image?.startsWith('/') ? (
						<Image
							src={user.image as string}
							alt={user.name ?? ''}
							width={36}
							height={36}
							className="size-9 object-cover"
						/>
					) : (
						(user.name ?? '').charAt(0)
					)}
				</span>
				<span className="text-sm font-semibold">{user.name}</span>
				<span aria-hidden="true" className="text-xs">
					▾
				</span>
			</summary>

			<div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-2xl border border-[#e0e8e1] bg-white p-4 shadow-xl">
				<p className="truncate text-sm font-bold">{user.name}</p>
				<p className="mt-1 break-all text-xs text-[#68746c]">
					{user.email}
				</p>

				<div className="my-3 border-t border-[#e8eee9]" />

				<Link
					href="/profile"
					className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-[#edf3ee]"
				>
					<span aria-hidden="true">👤</span>
					আমার প্রোফাইল
				</Link>

				<button
					type="button"
					onClick={signOut}
					className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm text-red-500 transition-colors hover:bg-red-50"
				>
					<span aria-hidden="true">↩</span>
					সাইন আউট
				</button>
			</div>
		</details>
	);
}

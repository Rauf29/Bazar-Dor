'use client';

import { authClient } from '@/lib/auth-client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

export default function ProfilePage() {
	const { data: session, isPending } = authClient.useSession();
	const [message, setMessage] = useState('');

	if (isPending) {
		return (
			<main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
				<div className="h-40 animate-pulse rounded-2xl border border-[#dfe8e0] bg-white" />
			</main>
		);
	}

	const user = session?.user;

	if (!user) {
		return (
			<main className="mx-auto w-full max-w-3xl px-4 py-10 text-center sm:px-6">
				<p className="text-sm text-[#68746c]">
					প্রোফাইল দেখতে{' '}
					<Link
						href="/sign-in"
						className="font-bold text-[#078b45] hover:underline"
					>
						সাইন ইন করুন
					</Link>
				</p>
			</main>
		);
	}

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setMessage('');

		const formData = new FormData(e.currentTarget);
		const { error } = await authClient.updateUser({
			name: String(formData.get('name')),
		});

		if (error) {
			setMessage('আপডেট হয়নি, আবার চেষ্টা করুন');
			return;
		}

		setMessage('নাম আপডেট হয়েছে');
	};

	const signOut = async () => {
		await authClient.signOut();
		toast.success('সাইন আউট হয়েছে');
	};

	const hasImage =
		user.image?.startsWith('/') || user.image?.startsWith('http');

	return (
		<main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
			<h1 className="text-2xl font-extrabold text-[#202821]">
				আমার প্রোফাইল
			</h1>
			<p className="mt-1 text-[13px] text-[#68746c]">
				আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
			</p>

			<div className="mt-6 flex items-center justify-between gap-4 rounded-2xl border border-[#dfe8e0] bg-white p-5">
				<div className="flex items-center gap-4">
					<span className="flex size-16 items-center justify-center overflow-hidden rounded-2xl bg-[#eff5f0] text-2xl font-bold text-[#078b45]">
						{hasImage ? (
							<Image
								src={user.image as string}
								alt={user.name ?? ''}
								width={64}
								height={64}
								className="size-16 object-cover"
							/>
						) : (
							(user.name ?? '').charAt(0)
						)}
					</span>
					<div>
						<p className="text-base font-extrabold text-[#202821]">
							{user.name}
						</p>
						<p className="mt-0.5 text-[13px] text-[#68746c]">
							{user.email}
						</p>
					</div>
				</div>

				<button
					type="button"
					onClick={signOut}
					className="shrink-0 rounded-lg border border-red-200 px-4 py-2 text-[13px] font-semibold text-red-500 transition-colors hover:bg-red-50"
				>
					↩ সাইন আউট
				</button>
			</div>

			<div className="mt-4 rounded-2xl border border-[#dfe8e0] bg-white p-5">
				<h2 className="text-base font-extrabold text-[#202821]">তথ্য</h2>
				<form onSubmit={onSubmit} className="mt-4 space-y-4">
					<div>
						<label className="mb-1.5 block text-sm font-semibold text-[#202821]">
							নাম
						</label>
						<input
							name="name"
							type="text"
							required
							defaultValue={user.name ?? ''}
							className="w-full rounded-lg border border-[#dfe8e0] bg-white px-4 py-2.5 text-sm text-[#202821] outline-none focus:border-[#078b45]"
						/>
					</div>

					{message && (
						<p className="text-[13px] font-semibold text-[#078b45]">
							{message}
						</p>
					)}

					<button
						type="submit"
						className="w-full rounded-lg bg-[#078b45] px-5 py-3 text-sm font-bold text-white shadow-[0_3px_0_#066a36] transition-colors hover:bg-[#06783c]"
					>
						আপডেট
					</button>
				</form>
			</div>
		</main>
	);
}

'use client';

import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'react-toastify';

const SignUpPage = () => {
	const router = useRouter();

	const onSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
		e.preventDefault();

		const formData = new FormData(e.target);
		const user = Object.fromEntries(formData.entries()) as {
			name: string;
			email: string;
			password: string;
			confirm: string;
		};

		if (user.password !== user.confirm) {
			toast.error('দুই পাসওয়ার্ড মিলছে না');
			return;
		}

		const { data, error } = await authClient.signUp.email({
			name: user.name,
			email: user.email,
			password: user.password,
			callbackURL: '/',
		});

		if (data) {
			toast.success('অ্যাকাউন্ট তৈরি হয়েছে');
			setTimeout(() => router.push('/'), 1000);
		}

		if (error) {
			toast.error('সাইন আপ হয়নি, আবার চেষ্টা করুন');
		}
	};

	const handleGoogleSignIn = async () => {
		await authClient.signIn.social({
			provider: 'google',
		});
	};

	const handleGithubSignIn = async () => {
		await authClient.signIn.social({
			provider: 'github',
		});
	};

	return (
		<main className="mx-auto w-full max-w-md px-4 py-10 sm:px-6">
			<h1 className="text-center text-2xl font-extrabold text-[#202821]">
				অ্যাকাউন্ট তৈরি করুন
			</h1>
			<p className="mt-2 text-center text-[13px] text-[#68746c]">
				বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
			</p>

			<div className="mt-6 rounded-2xl border border-[#dfe8e0] bg-white p-6">
				<form onSubmit={onSubmit} className="space-y-4">
					<div>
						<label className="mb-1.5 block text-sm font-semibold text-[#202821]">
							নাম
						</label>
						<input
							name="name"
							type="text"
							required
							placeholder="যেমন: রহিম উদ্দিন"
							className="w-full rounded-lg border border-[#dfe8e0] bg-white px-4 py-2.5 text-sm text-[#202821] outline-none focus:border-[#078b45] placeholder:text-[#9aa5b1]"
						/>
					</div>

					<div>
						<label className="mb-1.5 block text-sm font-semibold text-[#202821]">
							ইমেইল
						</label>
						<input
							name="email"
							type="email"
							required
							placeholder="you@example.com"
							className="w-full rounded-lg border border-[#dfe8e0] bg-white px-4 py-2.5 text-sm text-[#202821] outline-none focus:border-[#078b45] placeholder:text-[#9aa5b1]"
						/>
					</div>

					<div>
						<label className="mb-1.5 block text-sm font-semibold text-[#202821]">
							পাসওয়ার্ড
						</label>
						<input
							name="password"
							type="password"
							required
							placeholder="কমপক্ষে ৮ অক্ষর"
							className="w-full rounded-lg border border-[#dfe8e0] bg-white px-4 py-2.5 text-sm text-[#202821] outline-none focus:border-[#078b45] placeholder:text-[#9aa5b1]"
						/>
					</div>

					<div>
						<label className="mb-1.5 block text-sm font-semibold text-[#202821]">
							পাসওয়ার্ড নিশ্চিত করুন
						</label>
						<input
							name="confirm"
							type="password"
							required
							placeholder="আবার লিখুন"
							className="w-full rounded-lg border border-[#dfe8e0] bg-white px-4 py-2.5 text-sm text-[#202821] outline-none focus:border-[#078b45] placeholder:text-[#9aa5b1]"
						/>
					</div>

					<button
						type="submit"
						className="w-full rounded-lg bg-[#078b45] px-5 py-3 text-sm font-bold text-white shadow-[0_3px_0_#066a36] transition-colors hover:bg-[#06783c] cursor-pointer"
					>
						অ্যাকাউন্ট তৈরি করুন
					</button>
				</form>

				<div className="my-4 flex items-center gap-3 text-[13px] text-[#68746c]">
					<span className="h-px flex-1 bg-[#e5ece6]" />
					অথবা
					<span className="h-px flex-1 bg-[#e5ece6]" />
				</div>

				<div className="grid grid-cols-2 gap-2">
					<button
						type="button"
						onClick={handleGoogleSignIn}
						className="rounded-lg border border-[#dfe8e0] px-2 py-2.5 text-[13px] font-semibold text-[#202821] transition-colors hover:bg-[#f9fcfa]"
					>
						Google দিয়ে চালিয়ে যান
					</button>
					<button
						type="button"
						onClick={handleGithubSignIn}
						className="rounded-lg border border-[#dfe8e0] px-2 py-2.5 text-[13px] font-semibold text-[#202821] transition-colors hover:bg-[#f9fcfa]"
					>
						GitHub দিয়ে চালিয়ে যান
					</button>
				</div>

				<p className="mt-4 text-center text-[13px] text-[#68746c]">
					অ্যাকাউন্ট আছে?{' '}
					<Link
						href="/sign-in"
						className="font-bold text-[#078b45] hover:underline"
					>
						সাইন ইন করুন
					</Link>
				</p>
			</div>

			<p className="mt-4 text-center text-[13px] text-[#68746c]">
				<Link href="/" className="hover:text-[#078b45]">
					← হোমে ফিরে যান
				</Link>
			</p>
		</main>
	);
};

export default SignUpPage;

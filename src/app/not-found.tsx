import Link from 'next/link';

export default function NotFound() {
	return (
		<div className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-center justify-center px-4 py-16 text-center">
			<p className="text-7xl font-black text-[#078b45]">৪০৪</p>
			<h2 className="mt-4 text-2xl font-extrabold text-[#202821]">
				পেজ পাওয়া যায়নি
			</h2>
			<p className="mt-2 max-w-md text-sm text-[#68746c]">
				দুঃখিত, আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যায়নি। লিংকটি ভুল
				হতে পারে অথবা সরিয়ে ফেলা হয়েছে।
			</p>
			<div className="mt-6">
				<Link
					href="/"
					className="inline-flex rounded-lg bg-[#078b45] px-5 py-3 text-sm font-bold text-white shadow-[0_3px_0_#066a36] transition-colors hover:bg-[#06783c]"
				>
					হোমে ফিরুন
				</Link>
			</div>
		</div>
	);
}

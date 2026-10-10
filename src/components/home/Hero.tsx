import Image from 'next/image';

export default function Hero() {
	const date = new Date().toLocaleDateString('bn-BD', {
		dateStyle: 'full',
	});

	return (
		<section className="flex min-h-[250px] flex-col items-center justify-between gap-6 rounded-3xl border border-[#dfe8e0] bg-[#f9fcfa] px-5 py-7 sm:flex-row sm:px-8 lg:px-10">
			<div className="max-w-2xl">
				<span className="inline-flex rounded-full bg-[#e1f2e6] px-3 py-1 text-sm font-semibold text-[#078b45]">
					{date}
				</span>

				<h1 className="mt-4 text-2xl font-extrabold leading-tight tracking-tight text-[#202821] sm:text-3xl lg:text-4xl">
					আজকের বাজারের দাম এক নজরে
				</h1>

				<p className="mt-4 max-w-xl text-base leading-6 text-[#68746c]">
					চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
					বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের
					পরিবর্তন এক জায়গায়।
				</p>

				<a
					href="#all-products"
					className="mt-6 inline-flex rounded-lg bg-[#078b45] px-5 py-3 text-base font-bold text-white shadow-[0_3px_0_#066a36] transition-colors hover:bg-[#06783c]"
				>
					সব পণ্য দেখুন
				</a>
			</div>

			<Image
				src="/bazar-hero.png"
				alt="তাজা বাজার"
				width={315}
				height={263}
				priority
				className="h-auto w-full max-w-[315px]"
			/>
		</section>
	);
}

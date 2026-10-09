import Header from '@/components/Header';
import Marquee from '@/components/Marquee';
import type { Metadata } from 'next';
import { Noto_Serif_Bengali } from 'next/font/google';
import './globals.css';

const notoSerifBengali = Noto_Serif_Bengali({
	subsets: ['latin', 'bengali'],
});

export const metadata: Metadata = {
	title: 'বাজার দর',
	description: 'বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের বাজারদর',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
	return (
		<html
			lang="en"
			suppressHydrationWarning
			className={`${notoSerifBengali.className} h-full antialiased`}
		>
			<body
				suppressHydrationWarning
				className="flex min-h-full flex-col bg-[#eff5f0] text-[#202821]"
			>
				<Header />

				<Marquee />

				{children}
			</body>
		</html>
	);
}

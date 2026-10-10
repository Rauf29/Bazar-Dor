import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Marquee from '@/components/Marquee';
import ToastProvider from '@/components/ToastProvider';
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
			<body className="flex min-h-full flex-col bg-[#eff5f0] text-[#202821]">
				<Header />

				<Marquee />

				<div className="flex-1">{children}</div>

				<Footer />
				<ToastProvider />
			</body>
		</html>
	);
}

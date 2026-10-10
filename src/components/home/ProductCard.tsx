import type { Product } from '@/products';
import { UNIT_LABELS } from '@/products';
import Link from 'next/link';

type Props = {
	product: Product;
};

export default function ProductCard({ product }: Props) {
	const isUp = product.direction === 'up';
	const isDown = product.direction === 'down';
	const unitLabel = UNIT_LABELS[product.unit] ?? `প্রতি ${product.unit}`;

	return (
		<Link
			href={`/products/${product.slug}`}
			className="group rounded-2xl border border-[#dfe8e0] bg-[#f9fcfa] p-4 transition-colors hover:border-[#078b45]/40 hover:bg-white"
		>
			<div className="flex items-center gap-3">
				<div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#eff5f0] text-2xl">
					<span aria-hidden="true">{product.image}</span>
				</div>

				<div className="min-w-0">
					<h3 className="truncate text-base font-bold text-[#202821] sm:text-lg">
						{product.name}
					</h3>
					<p className="mt-0.5 text-sm text-[#68746c]">{unitLabel}</p>
				</div>
			</div>

			<div className="mt-3 flex items-end justify-between gap-2">
				<div>
					<p className="text-sm text-[#68746c]">আজকের দাম</p>
					<p className="mt-0.5 text-xl font-extrabold leading-tight text-[#202821]">
						{product.price.toLocaleString('bn-BD')}{' '}
						<span className="text-base font-medium">টাকা</span>
					</p>
				</div>

				<span
					className={`shrink-0 rounded-full px-2 py-1 text-xs font-semibold ${
						isUp
							? 'bg-red-50 text-red-500'
							: isDown
								? 'bg-[#edf7ef] text-[#078b45]'
								: 'bg-[#eff3f0] text-[#68746c]'
					}`}
				>
					{isUp ? '▲' : isDown ? '▼' : '—'}{' '}
					{product.change.toLocaleString('bn-BD')}%
				</span>
			</div>
		</Link>
	);
}

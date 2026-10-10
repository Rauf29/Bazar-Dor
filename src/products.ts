export type Market = {
	market: string;
	division: string;
	min: number;
	max: number;
};

export type Product = {
	id: number;
	slug: string;
	name: string;
	category: string;
	image: string;
	unit: string;
	price: number;
	yesterday: number;
	change: number;
	direction: 'up' | 'down' | 'same';
	markets: Market[];
};

export type Category = {
	id: string;
	slug: string;
	name: string;
	icon: string;
};

export const UNIT_LABELS: Record<string, string> = {
	kg: 'প্রতি কেজি',
	litre: 'প্রতি লিটার',
	dozen: 'প্রতি ডজন',
	piece: 'প্রতি পিস',
};

const PRODUCTS_API_URL = 'https://api.abcz.workers.dev/api/bazardor/products';
const CATEGORIES_API_URL =
	'https://api.abcz.workers.dev/api/bazardor/categories';

function toProduct(item: {
	id: number;
	slug: string;
	nameBn: string;
	category: string;
	image: string;
	unit: string;
	today: number;
	yesterday: number;
	change: { dir: 'up' | 'down' | 'same' | 'flat'; pct: number };
	markets: Market[];
}): Product {
	return {
		id: item.id,
		slug: item.slug,
		name: item.nameBn,
		category: item.category,
		image: item.image || '',
		unit: item.unit,
		price: item.today,
		yesterday: item.yesterday,
		change: item.change.pct,
		direction: item.change.dir === 'flat' ? 'same' : item.change.dir,
		markets: item.markets ?? [],
	};
}

export async function getProducts(): Promise<Product[]> {
	try {
		const res = await fetch(PRODUCTS_API_URL, {
			next: { revalidate: 300 },
		});

		if (!res.ok) return [];

		const items = await res.json();

		return items.map(toProduct);
	} catch {
		return [];
	}
}

export async function getProductsByCategory(slug: string): Promise<Product[]> {
	const res = await fetch(`${PRODUCTS_API_URL}?category=${slug}`, {
		next: { revalidate: 300 },
	}).catch(() => null);

	if (res?.ok) {
		const items = await res.json();
		return items.map(toProduct);
	}

	const all = await getProducts();
	return all.filter(item => item.category === slug);
}

export async function getCategories(): Promise<Category[]> {
	try {
		const res = await fetch(CATEGORIES_API_URL, {
			next: { revalidate: 300 },
		});

		if (!res.ok) return [];

		const items: {
			id: string;
			slug: string;
			nameBn: string;
			icon: string;
		}[] = await res.json();

		return items.map(item => ({
			id: item.id,
			slug: item.slug,
			name: item.nameBn,
			icon: item.icon || '',
		}));
	} catch {
		return [];
	}
}

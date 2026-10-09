export type Product = {
	id: number;
	slug: string;
	name: string;
	image: string;
	unit: string;
	price: number;
	change: number;
	direction: 'up' | 'down' | 'same';
};

type ApiProduct = {
	id: number;
	slug: string;
	nameBn: string;
	image?: string | null;
	unit: string;
	today: number;
	change: {
		dir: 'up' | 'down' | 'same' | 'flat';
		pct: number;
	};
};

export type Category = {
	id: string;
	slug: string;
	name: string;
	icon: string;
};

type ApiCategory = {
	id: string;
	slug: string;
	nameBn: string;
	icon?: string | null;
};

const PRODUCTS_API_URL = 'https://api.abcz.workers.dev/api/bazardor/products';
const CATEGORIES_API_URL =
	'https://api.abcz.workers.dev/api/bazardor/categories';

export async function getProducts(): Promise<Product[]> {
	try {
		const res = await fetch(PRODUCTS_API_URL, {
			next: { revalidate: 300 },
		});

		if (!res.ok) return [];

		const items: ApiProduct[] = await res.json();

		return items.map(item => ({
			id: item.id,
			slug: item.slug,
			name: item.nameBn,
			image: item.image?.trim() || '',
			unit: item.unit,
			price: item.today,
			change: item.change.pct,
			direction: item.change.dir === 'flat' ? 'same' : item.change.dir,
		}));
	} catch {
		return [];
	}
}

export async function getCategories(): Promise<Category[]> {
	try {
		const res = await fetch(CATEGORIES_API_URL, {
			next: { revalidate: 300 },
		});

		if (!res.ok) return [];

		const items: ApiCategory[] = await res.json();

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

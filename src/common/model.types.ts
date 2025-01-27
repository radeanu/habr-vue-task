export interface ApiUserOption {
	type: 'company' | 'user';
	alias: string;
	name?: string;
	avatar: string | null;
}

export interface ApiProductOption {
	id: number;
	title: string;
	brand?: string;
	description: string;
	price: number;
}

export interface UserOption extends ApiUserOption {
	name: string;
	avatar: string;
}

export interface ProductOption {
	id: number;
	title: string;
	brand: string;
	price: number;
}

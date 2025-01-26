export interface ApiUserOption {
	type: 'company' | 'user';
	alias: string;
	name?: string;
	avatar: string | null;
}

export interface UserOption extends ApiUserOption {
	name: string;
	avatar: string;
}

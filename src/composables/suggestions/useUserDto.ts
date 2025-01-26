import type { UserOption, ApiUserOption } from '@/common/model.types';

export function useUserDto() {
	const DEFAULT_AVATAR = '/images/user-default.png';

	function _getDefault(item: ApiUserOption): UserOption {
		return {
			...item,
			name: item.name ?? '-',
			avatar: item.avatar ?? DEFAULT_AVATAR
		};
	}

	function _getUser(item: ApiUserOption): UserOption {
		return {
			...item,
			name: item.name ?? item.alias,
			avatar: item.avatar ?? DEFAULT_AVATAR
		};
	}

	function _getCompany(item: ApiUserOption): UserOption {
		return {
			...item,
			name: item.name ?? item.alias,
			avatar: item.avatar ?? DEFAULT_AVATAR
		};
	}

	function formatDto(item: ApiUserOption): UserOption {
		if (item.type === 'company') return _getCompany(item);
		if (item.type === 'user') return _getUser(item);

		return _getDefault(item);
	}

	return { formatDto };
}

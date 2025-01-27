import type { ApiProductOption, ProductOption } from '@/common/model.types';

export function useProductDto() {
	function formatDto(item: ApiProductOption): ProductOption {
		return {
			id: item.id,
			price: item.price,
			title: item.title,
			brand: item?.brand ?? '-'
		};
	}

	return { formatDto };
}

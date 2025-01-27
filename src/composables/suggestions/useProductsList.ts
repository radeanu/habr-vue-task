import { ref } from 'vue';

import { useLoader } from '@/composables/useLoader';
import { useProductDto } from '@/composables/suggestions/useProductDto';

import * as apiService from '@/common/api.services';
import type { ApiProductOption, ProductOption } from '@/common/model.types';

export function useProductsList() {
	const MIN_SEARCH = 3;
	const errorMessage = ref<string>();
	const productsList = ref<ProductOption[]>([]);
	const selectedList = ref<ProductOption[]>([]);

	const loader = useLoader();
	const productDto = useProductDto();
	const fetchSuggestions = apiService.useFetchProducts();

	function _formatDto(list: ApiProductOption[]): ProductOption[] {
		return list.map((item) => productDto.formatDto(item));
	}

	async function handleSearch(value: string) {
		try {
			productsList.value = [];
			errorMessage.value = undefined;
			fetchSuggestions.cancelIfRunning();

			if (value.length < MIN_SEARCH) return;
			loader.start();

			const list = await fetchSuggestions.get(value);

			productsList.value = _formatDto(list);
		} catch (error) {
			const errMessage = apiService.getRequestErrorMessage(error);
			errorMessage.value = errMessage;
		} finally {
			loader.end();
		}
	}

	return { loader, errorMessage, selectedList, productsList, handleSearch, MIN_SEARCH };
}

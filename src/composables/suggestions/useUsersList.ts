import { ref } from 'vue';

import { useLoader } from '@/composables/useLoader';
import { useUserDto } from '@/composables/suggestions/useUserDto';

import * as apiService from '@/common/api.services';
import type { UserOption, ApiUserOption } from '@/common/model.types';

export function useSuggestionsList() {
	const MIN_SEARCH = 3;
	const errorMessage = ref<string>();
	const usersList = ref<UserOption[]>([]);
	const selectedList = ref<UserOption[]>([]);

	const loader = useLoader();
	const userDto = useUserDto();
	const fetchSuggestions = apiService.useFetchUsers();

	function _formatDto(list: ApiUserOption[]): UserOption[] {
		return list.map((item) => userDto.formatDto(item));
	}

	async function handleSearch(value: string) {
		try {
			usersList.value = [];
			errorMessage.value = undefined;
			fetchSuggestions.cancelIfRunning();

			if (value.length < MIN_SEARCH) return;
			loader.start();

			// Ошибку с кодом 500 предлагается эмулировать самостоятельно
			if (value === '666') {
				throw new Response(null, { status: 500 });
			}

			const list = await fetchSuggestions.get(value);

			usersList.value = _formatDto(list);
		} catch (error) {
			const errMessage = apiService.getRequestErrorMessage(error);
			errorMessage.value = errMessage;
		} finally {
			loader.end();
		}
	}

	return { loader, errorMessage, selectedList, usersList, handleSearch, MIN_SEARCH };
}

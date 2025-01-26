<template>
	<div class="main-page">
		<AppSuggestion
			required
			:max="5"
			:min-search="MIN_SEARCH"
			v-model="selectedList"
			:options="usersList"
			label="Пользователь или компания"
			placeholder="Введите логин"
			track-by="alias"
			class="suggestion-dropdown"
			@search="handleSearch"
		>
			<template #selected-option="{ option }">
				<span>@{{ option.alias }}</span>
			</template>

			<template #suggestion-before>
				<div class="fetch-status">
					<span v-if="loader.isLoading.value && !usersList.length">
						Загрузка...
					</span>
					<span v-else-if="!usersList.length">
						{{ errorMessage ?? 'Ничего не найдено' }}
					</span>
				</div>
			</template>

			<template #suggestion-option="{ option }">
				<UserOption v-bind="option" />
			</template>
		</AppSuggestion>
	</div>
</template>

<script setup lang="ts">
import UserOption from '@/components/suggestion/UserOption.vue';

import AppSuggestion from '@/components/suggestion/AppSuggestion.vue';
import { useSuggestionsList } from '@/composables/suggestions/useUsersList';

const { loader, handleSearch, usersList, selectedList, MIN_SEARCH, errorMessage } =
	useSuggestionsList();
</script>

<style lang="scss" scoped>
.main-page {
	padding: 20px;
}

.suggestion-dropdown {
	max-width: 600px;
	--dropdown-height: 300px;
}

.fetch-status {
	width: 100%;
	padding: 15px;
	text-align: center;
	color: var(--color-grey3);

	&:empty {
		display: none;
	}
}
</style>

<template>
	<div class="main-page">
		<AppSuggestion
			required
			:max="4"
			:min-search="MIN_SEARCH"
			v-model="selectedList"
			:options="usersList"
			label="Пользователь или компания (лимит - 4)"
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

		<br />
		<br />

		<AppSuggestion
			:min-search="prodMinSearch"
			v-model="selProdList"
			:options="productsList"
			label="Пример с другим API"
			track-by="id"
			class="suggestion-dropdown"
			@search="prodSearch"
		>
			<template #selected-option="{ option }">
				<span>{{ option.title }}: ${{ option.price }}</span>
			</template>

			<template #suggestion-before>
				<div class="fetch-status">
					<span v-if="prodLoader.isLoading.value && !productsList.length">
						Загрузка...
					</span>
					<span v-else-if="!productsList.length">
						{{ prodError ?? 'Ничего не найдено' }}
					</span>
				</div>
			</template>

			<template #suggestion-option="{ option }">
				<ProductOption v-bind="option" />
			</template>
		</AppSuggestion>
	</div>
</template>

<script setup lang="ts">
import UserOption from '@/components/suggestion/UserOption.vue';
import ProductOption from '@/components/suggestion/ProductOption.vue';

import AppSuggestion from '@/components/suggestion/AppSuggestion.vue';
import { useUsersList } from '@/composables/suggestions/useUsersList';
import { useProductsList } from '@/composables/suggestions/useProductsList';

const { loader, handleSearch, usersList, selectedList, MIN_SEARCH, errorMessage } =
	useUsersList();

const {
	productsList,
	loader: prodLoader,
	errorMessage: prodError,
	handleSearch: prodSearch,
	selectedList: selProdList,
	MIN_SEARCH: prodMinSearch
} = useProductsList();
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

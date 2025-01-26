<template>
	<div class="app-suggestion">
		<label
			v-if="label"
			for="search"
			class="label"
			:class="{ 'label--required': required }"
		>
			{{ label }}
		</label>

		<ul class="selected-list">
			<li class="selected-list--before">
				<slot name="input-before" />
			</li>

			<li v-for="(option, idx) in selectedList" :key="idx">
				<AppTag @remove="handleRemoveOption(option)">
					<template #name>
						<slot name="selected-option" :option="option">
							<span>{{ option?.name ?? idx }}</span>
						</slot>
					</template>
				</AppTag>
			</li>

			<li class="selected-list--after">
				<AppInputText
					id="search"
					tabindex="0"
					name="search"
					role="search"
					:placeholder="placeholder"
					@input="debounceSearch"
				/>
			</li>
		</ul>

		<ul v-if="displayOptions" class="suggestion-list" v-arrow-focus>
			<li class="suggestion-option suggestion-option--before">
				<slot name="suggestion-before" />
			</li>

			<li
				v-for="(item, idx) in optionsToDisplay"
				:key="idx"
				:class="{
					'suggestion-option': true,
					'suggestion-option--selected': item.meta.selected
				}"
				tabindex="0"
				@click="handleClickOption(item.option)"
				@keydown.enter="handleClickOption(item.option)"
			>
				<slot name="suggestion-option" :option="item.option" :meta="item.meta">
					<span>{{ item.option?.name ?? idx }}</span>
				</slot>
			</li>

			<li class="suggestion-option suggestion-option--after">
				<slot name="suggestion-after" />
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts" generic="T extends Option">
import { computed, ref } from 'vue';

import { useDebounce } from '@/composables/useDebounce';

export type Option = {
	id?: number;
	name?: string;
};

interface Props {
	options: T[];
	max?: number;
	label?: string;
	trackBy?: keyof T;
	denounce?: number;
	minSearch?: number;
	required?: boolean;
	placeholder?: string;
	hideSelected?: boolean;
}

const $emit = defineEmits<{
	(e: 'select', value: T): void;
	(e: 'remove', value: T): void;
	(e: 'search', value: string): void;
	(e: 'click-option', value: T): void;
}>();

const props = withDefaults(defineProps<Props>(), {
	minSearch: 1,
	denounce: 300,
	placeholder: 'Поиск'
});

const search = ref('');

const selectedList = defineModel<T[]>({ default: [], required: false });
const debounceSearch = useDebounce(handleSearch, props.denounce);

const formattedOptions = computed(() => {
	return props.options.map((opt) => {
		const selected = selectedList.value.some((val) => {
			return _checkIsSameOption(opt, val);
		});

		return {
			option: opt,
			meta: {
				selected
			}
		};
	});
});

const optionsToDisplay = computed(() => {
	if (!props.hideSelected) {
		return formattedOptions.value;
	}

	return formattedOptions.value.filter((opt) => !opt.meta.selected);
});

const displayOptions = computed(() => {
	return search.value.length >= props.minSearch;
});

function _checkIsSameOption(opt: T, val: T) {
	if (!props.trackBy) {
		return val === opt;
	}

	return val[props.trackBy] === opt[props.trackBy];
}

function handleSearch(value: string) {
	search.value = value;
	$emit('search', value);
}

function handleClickOption(opt: T) {
	$emit('click-option', JSON.parse(JSON.stringify(opt)));
	handleSelectOption(opt);
}

function handleSelectOption(opt: T) {
	if (props.max && selectedList.value.length === props.max) return;

	const exists = selectedList.value.some((val) => {
		return _checkIsSameOption(opt, val);
	});

	if (exists) return;

	selectedList.value.push(opt);
	$emit('select', JSON.parse(JSON.stringify(opt)));
}

function handleRemoveOption(opt: T) {
	selectedList.value = selectedList.value.filter((v) => {
		return !_checkIsSameOption(opt, v);
	});

	$emit('remove', JSON.parse(JSON.stringify(opt)));
}
</script>

<style lang="scss" scoped>
.app-suggestion {
	position: relative;
}

.label {
	display: block;
	font-weight: bold;
	margin-bottom: 10px;
	position: relative;

	&--required {
		padding-left: 10px;
	}

	&--required::before {
		content: '\2731';
		left: 0;
		font-size: 8px;
		position: absolute;
		color: var(--color-red);
	}
}

.selected-list {
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
	width: 100%;
	padding: 5px;
	border-radius: 4px;
	align-items: center;
	border: 1px solid var(--color-grey2);

	&:hover,
	&:focus-within {
		border-color: var(--color-blue2);
	}

	&--before,
	&--after {
		flex: 1;
		min-width: 150px;

		&:empty {
			display: none;
		}
	}
}

.suggestion-list {
	display: flex;
	overflow: auto;
	width: 100%;
	min-width: 250px;
	max-height: 300px;
	position: absolute;
	border-radius: 4px;
	flex-direction: column;
	top: calc(100% + 20px);
	background-color: var(--color-white);
	-webkit-box-shadow: var(--box-shadow);
	-moz-box-shadow: var(--box-shadow);
	box-shadow: var(--box-shadow);
}

.suggestion-option {
	&:hover,
	&:focus,
	&:focus-within,
	&:focus-visible {
		background-color: var(--color-grey4);
	}

	&--selected {
		background-color: var(--color-grey4);
	}

	&--before,
	&--after {
		&:empty {
			display: none;
		}

		&:hover {
			background-color: inherit;
		}
	}
}
</style>

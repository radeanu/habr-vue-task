<template>
	<input
		class="input-text"
		type="text"
		:name="name"
		:aria-label="placeholder"
		:placeholder="placeholder"
		:autocomplete="autocomplete"
		v-model="model"
		@update:model-value="handleInput"
	/>
</template>

<script setup lang="ts">
export type AppInputText = {
	name?: string;
	placeholder?: string;
	autocomplete?: string;
};

defineProps<AppInputText>();
const $emit = defineEmits<{
	(e: 'input', v: string): void;
}>();

const model = defineModel<string>({ required: false });

function handleInput(value: string) {
	$emit('input', value);
}
</script>

<style lang="scss" scoped>
.input-text {
	padding: 10px;
	height: 100%;
	width: 100%;
	background-color: transparent;

	&::placeholder {
		color: var(--color-grey3);
	}

	&::-ms-input-placeholder {
		color: var(--color-grey3);
	}

	&::-ms-input-placeholder {
		color: var(--color-grey3);
	}
}
</style>

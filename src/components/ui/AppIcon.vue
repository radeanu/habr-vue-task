<template>
	<svg
		aria-hidden="true"
		focusable="false"
		class="base-icon"
		:style="{ '--icon-size': size ?? '20px' }"
	>
		<use :xlink:href="'#icon-' + name" />
	</svg>
</template>

<script setup lang="ts">
export type AppIcon = {
	name: string;
	size?: string;
};

defineProps<AppIcon>();
</script>

<style scoped>
.base-icon {
	width: var(--icon-size);
	height: var(--icon-size);
	overflow: hidden;
}
</style>

<template>
	<component class="app-tag" :is="isTag">
		<span class="app-tag--name">
			<slot name="name">{{ name }}</slot>
		</span>

		<button :aria-label="removeAriaTxt" @click="$emit('remove')">
			<AppIcon name="cross" size="16px" />
		</button>
	</component>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { ARIA } from '@/common/constants';

export type AppTag = {
	tag?: string;
	name?: string;
};

defineOptions({ inheritAttrs: false });

const props = defineProps<AppTag>();
const $emit = defineEmits<{ (e: 'remove'): void }>();

const isTag = computed(() => props.tag ?? 'div');
const removeAriaTxt = computed(() => `${ARIA.remove} ${props.name}`);
</script>

<style lang="scss" scoped>
.app-tag {
	display: flex;
	gap: 4px;
	padding: 10px;
	overflow: hidden;
	white-space: nowrap;
	text-indent: 0;
	border-radius: 4px;
	align-items: center;
	color: var(--color-white);
	background-color: var(--color-blue);

	&--name {
		overflow: hidden;
		text-overflow: ellipsis;
	}
}
</style>

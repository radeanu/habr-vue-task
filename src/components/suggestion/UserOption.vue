<template>
	<div role="listitem" class="user-option">
		<AppImage
			role="img"
			class="user-option--image"
			:src="avatar"
			default-image="/images/user-default.png"
			lazy
		/>

		<div>
			<div class="name">{{ name }}</div>
			<div class="alias">@{{ alias }}</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { type UserOption } from '@/common/model.types';

defineProps<UserOption>();
</script>

<style lang="scss" scoped>
.user-option {
	display: flex;
	flex-wrap: nowrap;
	gap: 10px;
	align-items: center;
	padding: 15px;

	&--image {
		width: 44px;
		height: 44px;
		min-width: 44px;
		max-width: 44px;
		min-height: 44px;
		max-height: 44px;
		border-radius: 4px;
	}

	.alias {
		color: var(--color-grey3);
		font-size: 14px;
	}
}
</style>

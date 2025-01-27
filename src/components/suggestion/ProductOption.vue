<template>
	<div role="listitem" class="product-option">
		<dl>
			<dt>{{ title }}</dt>
			<dd>
				<b>Бранд: </b>
				<span>{{ brand }}</span>
			</dd>
			<dd>
				<b>Цена: </b>
				<span>${{ price }}</span>
			</dd>
		</dl>
	</div>
</template>

<script setup lang="ts">
import { type ProductOption } from '@/common/model.types';

defineProps<ProductOption>();
</script>

<style lang="scss" scoped>
.product-option {
	padding: 10px 20px;

	dl {
		margin: 0;
	}

	dd {
		margin-left: 10px;
	}
}
</style>

<template>
	<DefaultLayout>
		<RouterView />
	</DefaultLayout>

	<SvgSprites />
</template>

<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import SvgSprites from '@/components/SvgSprites.vue';
</script>

<style lang="scss" scoped></style>

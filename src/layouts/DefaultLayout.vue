<template>
	<div class="layout">
		<slot />
	</div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.layout {
	position: relative;
	width: inherit;
	height: inherit;
	display: grid;
	grid-template-columns: 100%;
	grid-template-rows: 1fr;
}
</style>

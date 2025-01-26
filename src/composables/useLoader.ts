import { computed, onUnmounted, readonly, ref } from 'vue';

export function useLoader() {
	const loading = ref(0);
	let timer: number | undefined;

	const isLoading = computed(() => loading.value > 0);

	onUnmounted(() => {
		if (timer !== undefined) {
			clearTimeout(timer);
		}
	});

	function start() {
		loading.value += 1;
	}

	function end(ms = 300) {
		if (loading.value === 0) return;

		timer = setTimeout(() => {
			loading.value -= 1;
		}, ms);
	}

	function forceEnd(ms = 300) {
		timer = setTimeout(() => {
			loading.value = 0;
		}, ms);
	}

	return {
		end,
		start,
		forceEnd,
		isLoading: readonly(isLoading)
	};
}

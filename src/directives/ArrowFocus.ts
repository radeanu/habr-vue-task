import type { App } from 'vue';

function handleKeyDown(ev: KeyboardEvent) {
	if (!ev.target) return;
	const node = ev.target as HTMLElement;

	const nextNode = node.nextSibling as HTMLElement;
	const prevNode = node.previousSibling as HTMLElement;

	if (['ArrowDown', 'ArrowRight'].includes(ev.key)) {
		return nextNode?.focus ? nextNode.focus() : undefined;
	}

	if (['ArrowUp', 'ArrowLeft'].includes(ev.key)) {
		return prevNode?.focus ? prevNode.focus() : undefined;
	}
}

export default function (app: App) {
	app.directive('arrow-focus', {
		mounted(el: HTMLElement) {
			el.addEventListener('keydown', handleKeyDown);
		},
		unmounted(el: HTMLElement) {
			el.removeEventListener('keydown', handleKeyDown);
		}
	});
}

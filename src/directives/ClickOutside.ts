import type { App, DirectiveBinding } from 'vue';

interface HTMLElementM extends HTMLElement {
	clickOutsideEvent: ($ev: MouseEvent) => void;
}

export default function (app: App) {
	app.directive('click-outside', {
		mounted(el: HTMLElementM, binding: DirectiveBinding) {
			el.clickOutsideEvent = function (event) {
				const target = event.target as HTMLElement;

				if (!(el === target || el.contains(target))) {
					binding.value(event, el);
				}
			};

			document.body.addEventListener('click', el.clickOutsideEvent, {
				capture: false
			});
		},
		unmounted(el: HTMLElementM) {
			document.body.removeEventListener('click', el.clickOutsideEvent);
		}
	});
}

import type { App } from 'vue';

import AppTag from './ui/AppTag.vue';
import AppIcon from './ui/AppIcon.vue';
import AppImage from './ui/AppImage.vue';
import AppInputText from './ui/AppInputText.vue';

export default function (app: App) {
	app.component('AppTag', AppTag);
	app.component('AppIcon', AppIcon);
	app.component('AppImage', AppImage);
	app.component('AppInputText', AppInputText);
}

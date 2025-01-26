import AppTag from '@/components/ui/AppTag.vue';
import AppIcon from '@/components/ui/AppIcon.vue';
import AppImage from '@/components/ui/AppImage.vue';
import AppInputText from '@/components/ui/AppInputText.vue';

declare module '@vue/runtime-core' {
	export interface GlobalComponents {
		AppTag: typeof AppTag;
		AppIcon: typeof AppIcon;
		AppImage: typeof AppImage;
		AppInputText: typeof AppInputText;
	}
}

import { createApp } from 'vue';

import './assets/main.scss';

import App from './App.vue';
import router from './router';

import useComponents from '@/components/index';
import useArrowFocus from '@/directives/ArrowFocus';
import useClickOutside from '@/directives/ClickOutside';

const app = createApp(App);

useComponents(app);
useArrowFocus(app);
useClickOutside(app);

app.use(router);
app.mount('#app');

import { createApp } from 'vue';

import './assets/main.scss';

import App from './App.vue';
import router from './router';

import useComponents from '@/components/index';
import useArrowFocus from '@/directives/ArrowFocus';

const app = createApp(App);

useComponents(app);
useArrowFocus(app);

app.use(router);
app.mount('#app');

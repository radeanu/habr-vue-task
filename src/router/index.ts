import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

const VITE_APP_BASE = import.meta.env.VITE_APP_BASE ?? '/';

const routes: Readonly<RouteRecordRaw[]> = [
	{
		path: '/',
		name: 'main',
		component: () => import('../views/MainView.vue')
	},
	{
		path: '/not-found',
		name: 'not-found',
		component: () => import('../views/errors/NotFoundView.vue')
	},
	{
		path: '/:catchAll(.*)',
		name: 'Not Found *',
		redirect: '/not-found'
	}
];

const router = createRouter({
	history: createWebHistory(VITE_APP_BASE),
	routes
});

router.beforeEach(async (to, from, next) => {
	try {
		document.title = String(to.meta.title || 'App');

		if (!to.matched.length) {
			return next({ name: 'not-found', force: true, replace: true });
		}

		return next();
	} catch (error) {
		console.error(error);
	}
});

export default router;

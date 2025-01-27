const PRODUCTS_API_URL = 'https://dummyjson.com/products/search';
const API_URL = 'https://habr.com/kek/v2/publication/suggest-mention';

import { HTTP_STATUS_ERROR } from '@/common/constants';
import type { ApiProductOption, ApiUserOption } from '@/common/model.types';

export function getRequestErrorMessage(error: unknown): string {
	if (error instanceof Response) {
		const statusCode = error?.status?.toString() as keyof typeof HTTP_STATUS_ERROR;
		const statusErr = HTTP_STATUS_ERROR?.[statusCode];

		return statusErr ?? HTTP_STATUS_ERROR.default;
	}

	return HTTP_STATUS_ERROR.default;
}

export function useFetchUsers() {
	let controller: AbortController;

	async function get(search: string): Promise<ApiUserOption[]> {
		controller = new AbortController();

		const url = new URL(API_URL);
		url.searchParams.append('q', search);

		const res = await fetch(url, { method: 'GET', signal: controller.signal });

		if (!res.ok) {
			return Promise.reject(res);
		}

		const jsonData = await res.json();
		return jsonData?.data ?? [];
	}

	function cancelIfRunning() {
		if (controller) {
			controller.abort();
		}
	}

	return { get, cancelIfRunning };
}

export function useFetchProducts() {
	let controller: AbortController;

	async function get(search: string): Promise<ApiProductOption[]> {
		controller = new AbortController();

		const url = new URL(PRODUCTS_API_URL);
		url.searchParams.append('q', search);

		const res = await fetch(url, { method: 'GET', signal: controller.signal });

		if (!res.ok) {
			return Promise.reject(res);
		}

		const jsonData = await res.json();
		return jsonData?.products ?? [];
	}

	function cancelIfRunning() {
		if (controller) {
			controller.abort();
		}
	}

	return { get, cancelIfRunning };
}

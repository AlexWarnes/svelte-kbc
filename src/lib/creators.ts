import { BROWSER, } from 'esm-env';
import { tick } from 'svelte';
import { writable } from 'svelte/store';

// TODO: This doesn't work if the dom content hasn't loaded yet, which can be confusing
const createStoreFromEvent = (event: string, elementID: string | null) => {
	const { subscribe } = writable(null, (set) => {
		let timerID: any;
		const debounce = () => {
			if (timerID) clearTimeout(timerID);
			timerID = setTimeout(() => {
				// the eventStore shouldn't "store" the latest event
				tick().then((_) => {
					set(null);
				});
			}, 50);
		};
		const handler = (evt: any) => {
			set(evt);
			debounce();
		};
		if (BROWSER) {
			if (elementID) {
				const element = document.querySelector(elementID);
				if (element) {
					element.addEventListener(event, handler);
				}
			} else {
				window.addEventListener(event, handler);
			}
		}
		return () => {
			if (BROWSER) {
				if (elementID) {
					const element = document.querySelector(elementID);
					if (element) {
						element.removeEventListener(event, handler);
					}
				} else {
					window.removeEventListener(event, handler);
				}

				if (timerID) clearTimeout(timerID);
			}
		};
	});

	return { subscribe };
};

export const readableEvent = (event: string, elementID: string | null = null) =>
	createStoreFromEvent(event, elementID);

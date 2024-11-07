<script lang="ts">
	import { BROWSER } from 'esm-env';
	import { setContext, getContext, onDestroy, tick } from 'svelte';
	import { writable, } from 'svelte/store';
	import type { KeyboardControl } from './models';

	export let config: KeyboardControl[] = [];
	export let eventProperty: keyof KeyboardEvent = 'key';
	export let debug: boolean = false;

	setContext<any>('threlte-keyboard-controls', {
		controls: {}
	});
	let { controls } = getContext<any>('threlte-keyboard-controls');

	let keycodeToControlName: any = {};
	let eventToControlName: any = {};
	let eventTimerIDs: any = {};

	const sep: string = '%idx%';

	function initControls(c: KeyboardControl[]) {
		for (let control of c) {
			// Configure key stores
			if (control.keys) {
				for (let keyIdx = 0; keyIdx < control.keys.length; keyIdx++) {
					const k = control.keys[keyIdx];
					if (typeof k === 'string') {
						keycodeToControlName[k] = control.name;
					} else {
						console.warn('svelte-kbc: keys must be strings.', k);
					}
				}
			}

			// Configure event stores
			if (control.events) {
				for (let evtIdx = 0; evtIdx < control.events.length; evtIdx++) {
					const eventName = control.events[evtIdx];
					if (typeof eventName === 'string') {
						eventToControlName[eventName] = control.name;
					}
				}
			}
			controls[control.name] = writable(false);
		}
	}

	function updateKeyboardControls(controlName: string, status: boolean, event: any = null) {
		if (controls[controlName]) {
			if (status && event) event.preventDefault();

			controls[controlName].set(status ? event : false);
		}
	}
	function updateEventControls(controlName: string, event: boolean | Event) {
		if (controls[controlName]) {
			controls[controlName].set(event);
			debounceEventNullification(controlName);
		}
	}

	function debounceEventNullification(controlName: string): void {
		if (!BROWSER) return;

		// Each control needs to be debounced/cleared individually
		if (eventTimerIDs[controlName]) clearTimeout(eventTimerIDs[controlName]);

		eventTimerIDs[controlName] = setTimeout(() => {
			// the eventStore shouldn't "store" the latest event
			controls[controlName].set(false);
		}, 50);
	}

	function handleKeys(evt: any, status: boolean) {
		// avoid blocking default meta shortcuts (not sure if we need this for ctrl)
		if (evt.metaKey) return;

		if (debug) {
			console.log({
				props: { config, eventProperty },
				eventValue: evt[eventProperty],
				evt
			});
		}
		const value: string = evt[eventProperty];

		updateKeyboardControls(keycodeToControlName[value], status, evt);
	}

	function handleEvent(evt: any) {
		if (debug) {
			console.log({
				props: { config },
				event: evt['type']
			});
		}
		const eventType = evt['type'];
		updateEventControls(eventToControlName[eventType], evt);
	}

	function metaWarning(c: KeyboardControl[]): void {
		c.forEach((control) => {
			if (control.keys) {
				const str = JSON.stringify(control.keys);
				if (str.toLowerCase().includes('meta')) {
					console.warn(
						`svelte-kbc WARNING:\nBinding to the meta key is not supported.\n\nThe meta key prevents any keyup events from firing, which can interfere with other keybindings.\n\nIf you know how to work around this issue, PRs are welcome :D`
					);
				}
			}
		});
	}

	onDestroy(() => {
		Object.values(eventTimerIDs).forEach((id: any) => clearTimeout(id));
	});

	$: initControls(config);
	$: metaWarning(config);
</script>

<svelte:window
	on:keydown={(evt) => handleKeys(evt, true)}
	on:keyup={(evt) => handleKeys(evt, false)}
	on:click={(evt) => handleEvent(evt)}
	on:pointerdown={(evt) => handleEvent(evt)}
	on:pointerup={(evt) => handleEvent(evt)}
	on:touchstart={(evt) => handleEvent(evt)}
	on:touchend={(evt) => handleEvent(evt)}
	on:scroll={(evt) => handleEvent(evt)}
/>

<slot />

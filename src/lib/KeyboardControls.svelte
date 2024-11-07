<script lang="ts">
	import { BROWSER } from 'esm-env';
	import { setContext, onDestroy, } from 'svelte';
	import type { KeyboardControl } from './models.js';
	import { json } from '@sveltejs/kit';

	// export let config: KeyboardControl[] = [];
	// export let eventProperty: keyof KeyboardEvent = 'key';
	// export let debug: boolean = false;

	let { 
		config = [],
		eventProperty = 'key',
		debug = false,
		children
	}: {
		config: KeyboardControl[],
		eventProperty?: keyof KeyboardEvent,
		debug?: boolean,
		children: any
	} = $props();
	let kbc: Record<string, boolean | Event> = $state({})
	setContext<any>('kbc-context', kbc);

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
			kbc[control.name] = false;
		}
	}

	function updateKeyboardControls(controlName: string, status: boolean, event: any = null) {
		if (controlName in kbc) {
			if (status && event) event.preventDefault();

			kbc[controlName] = status ? event : false;
		}
	}
	function updateEventControls(controlName: string, event: boolean | Event) {
		if (controlName in kbc) {
			kbc[controlName] = event;
			debounceEventNullification(controlName);
		}
	}

	function debounceEventNullification(controlName: string): void {
		if (!BROWSER) return;

		// Each control needs to be debounced/cleared individually
		if (eventTimerIDs[controlName]) clearTimeout(eventTimerIDs[controlName]);

		eventTimerIDs[controlName] = setTimeout(() => {
			// the eventStore shouldn't "store" the latest event
			kbc[controlName] = false;
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

	$effect(() => {
		initControls(config);
		metaWarning(config);
	})
</script>

<svelte:window
	onkeydown={(evt) => handleKeys(evt, true)}
	onkeyup={(evt) => handleKeys(evt, false)}
	onclick={(evt) => handleEvent(evt)}
	onpointerdown={(evt) => handleEvent(evt)}
	onpointerup={(evt) => handleEvent(evt)}
	ontouchstart={(evt) => handleEvent(evt)}
	ontouchend={(evt) => handleEvent(evt)}
	onscroll={(evt) => handleEvent(evt)}
/>

<pre>
<!-- {JSON.stringify(kbc, null, 2)} -->
</pre>
{@render children()}
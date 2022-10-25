<script lang="ts">
	import { setContext, getContext, onDestroy } from 'svelte';
	import { writable, derived, type Writable, type Readable } from 'svelte/store';
	import type { KeyboardControl } from './models';

	export let config: KeyboardControl[] = [];
	export let eventProperty: keyof KeyboardEvent = 'key';
	export let debug: boolean = false;

	setContext<any>('threlte-keyboard-controls', {
		controls: {}
	});
	let { controls } = getContext<any>('threlte-keyboard-controls');

	let keycodeToControlName: any = {};
	let derivedControls: { [key: string]: Readable<boolean> } = {};
	let integralKeys: { [key: string]: Writable<boolean> } = {};
	let activeCombo: boolean = false;

	function initControls(c: KeyboardControl[]) {
		for (let control of c) {
			for (let keyIdx = 0; keyIdx < control.keys.length; keyIdx++) {
				const k = control.keys[keyIdx];
				if (typeof k === 'string') {
					keycodeToControlName[k] = control.name;
				} else {
					let derivedArr: Writable<boolean>[] = [];
					k.forEach((ik) => {
						if (!integralKeys[ik]) {
							integralKeys[ik] = writable(false);
						}
						derivedArr.push(integralKeys[ik]);
					});
					derivedControls[`${control.name}_${keyIdx}`] = derived(derivedArr, (integrals) =>
						integrals.every((v) => !!v)
					);
				}
			}
			controls[control.name] = writable(false);
		}
	}

	function updateKeyboardControls(controlName: string, status: boolean) {
		if (controls[controlName]) {
			controls[controlName].set(status);
		}
	}

	function handleKeys(evt: any, status: boolean) {
		if (debug) {
			console.log({
				props: { config, eventProperty },
				eventValue: evt[eventProperty]
			});
		}
		const value: string = evt[eventProperty];

		if (integralKeys[value]) {
			integralKeys[value].set(status);
		}

		if (!activeCombo) {
			updateKeyboardControls(keycodeToControlName[value], status);
		}
	}

	const unsubs: any[] = [];

	$: initControls(config);

	$: if (Object.keys(derivedControls).length) {
		Object.entries(derivedControls).forEach(([controlName, derivedStatus]) => {
			const formattedName = controlName.split('_')[0];
			unsubs.push(
				derivedStatus.subscribe((status) => {
					activeCombo = status;
					return updateKeyboardControls(formattedName, status);
				})
			);
		});
	}

	onDestroy(() => {
		unsubs.forEach((unsub) => unsub());
	});
</script>

<svelte:window
	on:keydown|preventDefault={(evt) => handleKeys(evt, true)}
	on:keyup|preventDefault={(evt) => handleKeys(evt, false)}
/>

<slot />

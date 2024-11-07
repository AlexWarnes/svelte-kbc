<script lang="ts">
	import KeyboardControls from '$lib/KeyboardControls.svelte';
	import { alphaConfig, numericConfig, wasdConfig } from '$lib/keyConfigs.js';
	import type { KeyboardControl } from '$lib/models.js';
	import TestingAlphaConfig from '$lib/Testing_alphaConfig.svelte';
	import Testing_Events from '$lib/Testing_Events.svelte';
	import TestingNumericConfig from '$lib/Testing_numericConfig.svelte';
	import TestingWasdConfig from '$lib/Testing_wasdConfig.svelte';

	const eventsConfig: KeyboardControl[] = [
		{ name: 'Click', events: ['click'] },
		{ name: 'Pointer_Down', events: ['pointerdown'] },
		{ name: 'Pointer_Up', events: ['pointerup'] },
		{ name: 'Touch_Start', events: ['touchstart'] },
		{ name: 'Touch_End', events: ['touchend'] },
		{ name: 'SCROLL', events: ['scroll'] },
		// { name: 'metaY', keys: ['y'] , preventDefault: true }
	];

</script>

<main>
	<h1>Svelte Keyboard Controls</h1>
	<pre>
  <code>npm i -D svelte-kbc</code>
</pre>
	<KeyboardControls config={alphaConfig()}>
		<TestingAlphaConfig config={alphaConfig()} />
	</KeyboardControls>
	<KeyboardControls config={numericConfig()}>
		<TestingNumericConfig config={numericConfig()} />
	</KeyboardControls>

	<KeyboardControls config={eventsConfig}>
		<Testing_Events config={eventsConfig} />
	</KeyboardControls>

	<KeyboardControls config={wasdConfig()}>
		<TestingWasdConfig config={wasdConfig()} />
	</KeyboardControls>
</main>

<style>
	main {
		min-height: 125vh;
		font-family: Tahoma, sans-serif;
	}

</style>

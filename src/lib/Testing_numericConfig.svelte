<script lang="ts">
	import { useKeyboardControls } from './hooks';
	import type { KeyboardControl } from './models';

	export let config: KeyboardControl[];

	const alphabet = ['key0', 'key1', 'key2', 'key3', 'key4', 'key5', 'key6', 'key7', 'key8', 'key9'];
	const { key0, key1, key2, key3, key4, key5, key6, key7, key8, key9 } = useKeyboardControls();

	let active: any = {};
	alphabet.forEach((letter) => (active[letter] = false));

	$: active['key0'] = $key0;
	$: active['key1'] = $key1;
	$: active['key2'] = $key2;
	$: active['key3'] = $key3;
	$: active['key4'] = $key4;
	$: active['key5'] = $key5;
	$: active['key6'] = $key6;
	$: active['key7'] = $key7;
	$: active['key8'] = $key8;
	$: active['key9'] = $key9;
</script>

<h2>numericConfig Testing</h2>
<div class="keys">
	{#each config as control (control.name)}
		<span class="key" style:background={active[control.name] ? '#3ebf77' : '#eeeeee'}>
			{control.name.replace("key","")}
		</span>
	{/each}
</div>

<style>
	.keys {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		gap: 0.5rem;
	}
	.key {
		width: 3rem;
		height: 3rem;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>

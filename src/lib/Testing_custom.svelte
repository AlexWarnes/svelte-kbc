<script lang="ts">
	import { useKeyboardControls } from './hooks';
	import type { KeyboardControl } from './models';

	export let config: KeyboardControl[];

	const customConfig = [
		{ name: 'reload', keys: ['r'] },
		{ name: 'scopeSwap', keys: ['t'] }
	] as const;

	const g = useKeyboardControls<typeof customConfig>();
	const { reload, scopeSwap } = g;

	let active: any = {
		reload: false,
		scopeSwap: false
	};

	$: active['reload'] = $reload;
	$: active['scopeSwap'] = $scopeSwap;
</script>

<h2>wasdConfig Testing</h2>
<div class="keys">
	{#each config as control (control.name)}
		<span class="key" style:background={active[control.name] ? '#3ebf77' : '#eeeeee'}>
			{control.name}
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

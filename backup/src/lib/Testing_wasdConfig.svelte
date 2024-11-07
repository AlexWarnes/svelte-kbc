<script lang="ts">
	import { useKeyboardControls } from './hooks';
	import type { KeyboardControl } from './models';

	export let config: KeyboardControl[];

	const { w, a, s, d, shift, space } = useKeyboardControls();

	let active: any = {
		w: false,
		a: false,
		s: false,
		d: false
	};

	$: active['w'] = $w;
	$: active['a'] = $a;
	$: active['s'] = $s;
	$: active['d'] = $d;
	$: active['shift'] = $shift;
	$: active['space'] = $space;

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

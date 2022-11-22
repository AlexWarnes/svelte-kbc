<script lang="ts">
	import { useKeyboardControls } from './hooks';
	import type { KeyboardControl } from './models';

	export let config: KeyboardControl[];

	const { UP, f, F, Control_a } = useKeyboardControls();

	let active: string = '';

	$: if ($UP) {
		active = 'UP';
	} else if ($f) {
		active = 'f';
	} else if ($F) {
		active = 'F';
	} else if ($Control_a) {
		active = 'Control_a';
	} else {
    active = '';
  }
</script>

<ul>
	{#each config as control (control.name)}
		<li style:background={active === control.name ? '#3ebf77' : '#eeeeee'}>
			<pre>{JSON.stringify(control, null, 2)}</pre>
		</li>
	{/each}
</ul>

<style>
  ul {
    list-style: none;
    padding: 0;
    /* for testing preventDefault on ArrowUp */
    height: 125vh;
  }
</style>
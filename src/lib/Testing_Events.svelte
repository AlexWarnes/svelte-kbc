<script lang="ts">
	import { useKeyboardControls } from './hooks';
	import type { KeyboardControl } from './models';

	export let config: KeyboardControl[];

	const { Click, Pointer_Down, Pointer_Up, Touch_Start, Touch_End, SCROLL } = useKeyboardControls();

	let active: any = {
		Click: false,
		Pointer_Down: false,
		Pointer_Up: false,
		Touch_Start: false,
		Touch_End: false
	};

	$: active['Click'] = $Click;

	$: active['Pointer_Down'] = $Pointer_Down;

	$: active['Pointer_Up'] = $Pointer_Up;

	$: active['Touch_Start'] = $Touch_Start;

	$: active['Touch_End'] = $Touch_End;

	$: active['SCROLL'] = $SCROLL;
</script>

<h2>Events</h2>
<section>
	{#each config as control (control.name)}
		<div class="card" style:background={active[control.name] ? '#3ebf77' : '#eeeeee'}>
			<pre>{JSON.stringify(control, null, 2)}</pre>
		</div>
	{/each}
</section>

<style>
	section {
		display: flex;
		justify-content: flex-start;
		align-items: stretch;
		flex-flow: row wrap;
	}
	.card {
		/* display: inline-block; */
		padding: 0.5rem;
		margin: 0.5rem;
		/* for testing preventDefault on ArrowUp */
		/* height: 125vh; */
	}
</style>

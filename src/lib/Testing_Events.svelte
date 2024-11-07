<script lang="ts">
	import { useKbc } from './hooks.js';
	import type { KeyboardControl } from './models.js';

	let { config }: { config: KeyboardControl[] } = $props();

	const kbc = useKbc();
</script>

<h2>Events</h2>
<section>
	{#each config as control (control.name)}
		<div class="card" style:background={kbc[control.name] ? '#3ebf77' : '#eeeeee'}>
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

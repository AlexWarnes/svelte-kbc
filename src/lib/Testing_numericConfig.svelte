<script lang="ts">
	import { useKbc } from './hooks.ts';
	import type { KeyboardControl } from './models.ts';

	let { config }: { config: KeyboardControl[] } = $props();
	const kbc = useKbc();

</script>

<h2>numericConfig Testing</h2>
<div class="keys">
	{#each config as control (control.name)}
		<span class="key" style:background={kbc[control.name] ? '#3ebf77' : '#eeeeee'}>
			{control.name.replace('key', '')}
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

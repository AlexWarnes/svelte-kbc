<script lang="ts">
	import { useKeyboardControls } from '$lib';
	import { readableEvent } from '$lib/creators';
	import { wasdConfig } from '$lib/keyConfigs';
	import TestingWasdConfig from '$lib/Testing_wasdConfig.svelte';
	import { onMount } from 'svelte';

	const { w, a, s, d, shift, space } = useKeyboardControls();

	let pointerdown_aqua: any = null;
	let pointerup_aqua: any = null;

	let pointerdown_seagreen: any = null;
	let pointerup_seagreen: any = null;

	let click_blue: any = null;

	let a_and_pointerdown: boolean | null = null;
	let s_and_pointerdown: boolean | null = null;
	let shift_and_click: boolean | null = null;

	onMount(() => {
		pointerdown_aqua = readableEvent('pointerdown', '#aqua');
		pointerup_aqua = readableEvent('pointerup', '#aqua');

		pointerdown_seagreen = readableEvent('pointerdown', '#seagreen');
		pointerup_seagreen = readableEvent('pointerup', '#seagreen');

		click_blue = readableEvent('click', '#blue');
	});
	$: if (pointerdown_aqua && pointerup_aqua) {
		if ($a && $pointerdown_aqua) a_and_pointerdown = true;
		if (!$a || $pointerup_aqua) a_and_pointerdown = false;
	}
	$: if (pointerdown_seagreen && pointerup_seagreen) {
		if ($s && $pointerdown_seagreen) s_and_pointerdown = true;
		if (!$s || $pointerup_seagreen) s_and_pointerdown = false;
	}
	$: if (click_blue) {
		shift_and_click = $shift && $click_blue;
	}
</script>

<div class="click-area" id="aqua" style:background={!!a_and_pointerdown ? 'dodgerblue' : '#232323'}>
	<h2>Pointerdown + a</h2>
</div>

<div class="click-area" id="seagreen" style:background={!!s_and_pointerdown ? 'seagreen' : '#232323'}>
	<h2>Pointerdown + s</h2>
</div>

<div class="click-area" id="blue" style:background={!!shift_and_click ? 'maroon' : '#232323'}>
	<h2>Click + Shift</h2>
</div>

<div class="display">
<TestingWasdConfig config={wasdConfig()}/>
</div>
<style>
	.click-area {
		width: 400px;
		height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem auto;
    color: #fafbfc;
	}
  h2 {
    user-select: none;
  }
  .display {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    user-select: none;
  }
</style>

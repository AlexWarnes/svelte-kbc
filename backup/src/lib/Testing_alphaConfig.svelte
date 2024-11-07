<script lang="ts">
	import { useKeyboardControls } from './hooks';
	import type { KeyboardControl } from './models';

	export let config: KeyboardControl[];

	const alphabet = [
		'a',
		'b',
		'c',
		'd',
		'e',
		'f',
		'g',
		'h',
		'i',
		'j',
		'k',
		'l',
		'm',
		'n',
		'o',
		'p',
		'q',
		'r',
		's',
		't',
		'u',
		'v',
		'w',
		'x',
		'y',
		'z'
	];
	const { a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z } =
		useKeyboardControls();

	let active: any = {};
	alphabet.forEach((letter) => (active[letter] = false));

$: active['a'] = $a
$: active['b'] = $b
$: active['c'] = $c
$: active['d'] = $d
$: active['e'] = $e
$: active['f'] = $f
$: active['g'] = $g
$: active['h'] = $h
$: active['i'] = $i
$: active['j'] = $j
$: active['k'] = $k
$: active['l'] = $l
$: active['m'] = $m
$: active['n'] = $n
$: active['o'] = $o
$: active['p'] = $p
$: active['q'] = $q
$: active['r'] = $r
$: active['s'] = $s
$: active['t'] = $t
$: active['u'] = $u
$: active['v'] = $v
$: active['w'] = $w
$: active['x'] = $x
$: active['y'] = $y
$: active['z'] = $z
</script>

<h2>alphaConfig Testing</h2>
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
		flex-wrap: wrap;
		max-width: 600px;
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

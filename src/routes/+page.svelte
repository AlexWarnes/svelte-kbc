<script lang="ts">
	import type { KeyboardControl } from "$lib";
	import KeyboardControls from "$lib/KeyboardControls.svelte";
	import Testing from "$lib/Testing.svelte";

  const config: KeyboardControl[] = [
    { name: 'UP', keys: ['ArrowUp', 'W', 'w'] },
    { name: 'f', keys: ['f']},
    { name: 'F', keys: ['F']},
    { name: 'Control_a', keys: [['Control', 'a']] },
    // { name: 'MetaFCombo', keys: [['Meta', 'f']] },
  ]
  
</script>

<h1>Svelte Keyboard Controls</h1>
<pre>
  <code>npm i -D svelte-kbc</code>
</pre>
<KeyboardControls {config} debug>
  <Testing {config} />
</KeyboardControls>
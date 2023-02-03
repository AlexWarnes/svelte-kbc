<script lang="ts">
	import KeyboardControls from '$lib/KeyboardControls.svelte';
	import Watcher from './Watcher.svelte';
	import { wasdConfig } from '$lib/keyConfigs';
</script>

<KeyboardControls config={wasdConfig()}>
	<Watcher />
</KeyboardControls>

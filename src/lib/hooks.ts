import { getContext } from 'svelte';
import type {
	Controls,
	ControlsContext,
	KeyboardControl,
	UseKeyboardControls,
	UseKeyboardControlsConfig
} from './models';
import type { Writable } from 'svelte/store';

export function useKeyboardControls<T extends UseKeyboardControlsConfig>(): UseKeyboardControls<T> {
	const { controls } = getContext<ControlsContext>('threlte-keyboard-controls');

	return controls;
}

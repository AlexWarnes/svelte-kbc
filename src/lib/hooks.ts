import { getContext } from 'svelte'

export const useKeyboardControls = () => {
	const { controls } = getContext<any>('threlte-keyboard-controls');
  return controls
}

import { getContext } from 'svelte'

export const useKbc = () => {
	// const { controls } = getContext<any>('kbc-context');
  // return controls
  return getContext<any>('kbc-context')
}


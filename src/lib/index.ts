import KeyboardControls from './KeyboardControls.svelte';
import { useKbc } from './hooks.ts';
import { wasdConfig, alphaConfig, numericConfig } from './keyConfigs.ts';
import { readableEvent } from './creators.ts';
import type {
	KeyConfig,
	KeyboardControl,
	WASDNameMap,
	AlphaNameMap,
	NumericNameMap
} from './models.ts';

export {
	KeyboardControls,
	useKbc,
	type KeyboardControl,
	type KeyConfig,
	wasdConfig,
	alphaConfig,
	numericConfig,
	readableEvent,
	type WASDNameMap,
	type AlphaNameMap,
	type NumericNameMap
};

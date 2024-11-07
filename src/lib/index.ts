import KeyboardControls from './KeyboardControls.svelte';
import { useKbc } from './hooks.js';
import { wasdConfig, alphaConfig, numericConfig } from './keyConfigs.js';
import { readableEvent } from './creators.js';
import type {
	KeyConfig,
	KeyboardControl,
	WASDNameMap,
	AlphaNameMap,
	NumericNameMap
} from './models.js';

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

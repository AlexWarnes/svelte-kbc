import KeyboardControls from './KeyboardControls.svelte';
import { useKeyboardControls } from './hooks';
import { wasdConfig, alphaConfig, numericConfig } from './keyConfigs';
import { readableEvent } from './creators';
import type {
	KeyConfig,
	KeyboardControl,
	WASDNameMap,
	AlphaNameMap,
	NumericNameMap
} from './models';

export {
	KeyboardControls,
	useKeyboardControls,
	KeyboardControl,
	KeyConfig,
	wasdConfig,
	alphaConfig,
	numericConfig,
	readableEvent,
	WASDNameMap,
	AlphaNameMap,
	NumericNameMap
};

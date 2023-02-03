import type { AlphaNameMap, KeyboardControl, NumericNameMap, WASDNameMap } from './models';

export const wasdConfig = (nameMap: WASDNameMap = {}): KeyboardControl[] => {
	return [
		{ name: nameMap?.w ?? 'w', keys: ['w', 'W', 'ArrowUp'] },
		{ name: nameMap?.a ?? 'a', keys: ['a', 'A', 'ArrowLeft'] },
		{ name: nameMap?.s ?? 's', keys: ['s', 'S', 'ArrowDown'] },
		{ name: nameMap?.d ?? 'd', keys: ['d', 'D', 'ArrowRight'] },
		{ name: nameMap?.shift ?? 'shift', keys: ['Shift'] },
		{ name: nameMap?.space ?? 'space', keys: [' ', 'Space'] }
	];
};
export const alphaConfig = (nameMap: AlphaNameMap = {}): KeyboardControl[] => {
	return [
		{ name: nameMap?.a ?? 'a', keys: ['a', 'A'] },
		{ name: nameMap?.b ?? 'b', keys: ['b', 'B'] },
		{ name: nameMap?.c ?? 'c', keys: ['c', 'C'] },
		{ name: nameMap?.d ?? 'd', keys: ['d', 'D'] },
		{ name: nameMap?.e ?? 'e', keys: ['e', 'E'] },
		{ name: nameMap?.f ?? 'f', keys: ['f', 'F'] },
		{ name: nameMap?.g ?? 'g', keys: ['g', 'G'] },
		{ name: nameMap?.h ?? 'h', keys: ['h', 'H'] },
		{ name: nameMap?.i ?? 'i', keys: ['i', 'I'] },
		{ name: nameMap?.j ?? 'j', keys: ['j', 'J'] },
		{ name: nameMap?.k ?? 'k', keys: ['k', 'K'] },
		{ name: nameMap?.l ?? 'l', keys: ['l', 'L'] },
		{ name: nameMap?.m ?? 'm', keys: ['m', 'M'] },
		{ name: nameMap?.n ?? 'n', keys: ['n', 'N'] },
		{ name: nameMap?.o ?? 'o', keys: ['o', 'O'] },
		{ name: nameMap?.p ?? 'p', keys: ['p', 'P'] },
		{ name: nameMap?.q ?? 'q', keys: ['q', 'Q'] },
		{ name: nameMap?.r ?? 'r', keys: ['r', 'R'] },
		{ name: nameMap?.s ?? 's', keys: ['s', 'S'] },
		{ name: nameMap?.t ?? 't', keys: ['t', 'T'] },
		{ name: nameMap?.u ?? 'u', keys: ['u', 'U'] },
		{ name: nameMap?.v ?? 'v', keys: ['v', 'V'] },
		{ name: nameMap?.w ?? 'w', keys: ['w', 'W'] },
		{ name: nameMap?.x ?? 'x', keys: ['x', 'X'] },
		{ name: nameMap?.y ?? 'y', keys: ['y', 'Y'] },
		{ name: nameMap?.z ?? 'z', keys: ['z', 'Z'] }
	];
};

export const numericConfig = (nameMap: NumericNameMap = {}): KeyboardControl[] => {
	return [
		{ name: nameMap?.key0 ?? 'key0', keys: ['0'] },
		{ name: nameMap?.key1 ?? 'key1', keys: ['1'] },
		{ name: nameMap?.key2 ?? 'key2', keys: ['2'] },
		{ name: nameMap?.key3 ?? 'key3', keys: ['3'] },
		{ name: nameMap?.key4 ?? 'key4', keys: ['4'] },
		{ name: nameMap?.key5 ?? 'key5', keys: ['5'] },
		{ name: nameMap?.key6 ?? 'key6', keys: ['6'] },
		{ name: nameMap?.key7 ?? 'key7', keys: ['7'] },
		{ name: nameMap?.key8 ?? 'key8', keys: ['8'] },
		{ name: nameMap?.key9 ?? 'key9', keys: ['9'] }
	];
};

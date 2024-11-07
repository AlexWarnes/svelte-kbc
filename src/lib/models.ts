export type KeyConfig = string | string[];
export type KbcEvent = 'click' | 'pointerdown' | 'pointerup' | 'touchstart' | 'touchend' | 'scroll'

export interface KeyboardControl {
	name: string;
	keys?: KeyConfig[];
	events?: KbcEvent[];
}
export interface WASDNameMap {
	w?: string;
	a?: string;
	s?: string;
	d?: string;
	shift?: string;
	space?: string;
}
export interface AlphaNameMap {
	a?: string;
	b?: string;
	c?: string;
	d?: string;
	e?: string;
	f?: string;
	g?: string;
	h?: string;
	i?: string;
	j?: string;
	k?: string;
	l?: string;
	m?: string;
	n?: string;
	o?: string;
	p?: string;
	q?: string;
	r?: string;
	s?: string;
	t?: string;
	u?: string;
	v?: string;
	w?: string;
	x?: string;
	y?: string;
	z?: string;
}
export interface NumericNameMap {
	key0?: string;
	key1?: string;
	key2?: string;
	key3?: string;
	key4?: string;
	key5?: string;
	key6?: string;
	key7?: string;
	key8?: string;
	key9?: string;
}

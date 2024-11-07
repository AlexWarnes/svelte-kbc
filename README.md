# svelte-kbc

Configure a rune for keyboard inputs and events in any Svelte app.

[Example on StackBlitz](https://stackblitz.com/edit/example-svelte-kbc?file=README.md) 

# Getting Started

1. Create an array of controls with a name and key(s) or events.

```js
const config = [
  // individual key presses
  { name: 'forward', keys: ['ArrowUp', 'w', 'W'] },
  { name: 'jump', keys: [' ', 'Space'] },
  { name: 'click', events: ['click'] },
]
```
**Note:**  _Only certain events are currently supported. See `KbcEvent` types below._

2. Wrap your application (or a part of your application) in `<KeyboardControls />` to create a context from your config. Any child component can then access the control rune with the names you provided.

```html
<KeyboardControls {config}>
  <!-- Anything in here can access the control rune with properties 'forward', 'jump', 'click' -->
  <BrowserGame />
</KeyboardControls>
```

3. In a child component, the `useKbc()` hook will return the controls rune, with the properties set in the config. From there, handle the events however you need to:

```js
  const kbc = useKbc();

  $effect(() => {
    if (kbc.forward) handleMoveForward()
    if (kbc.forward && kbc.jump) handleForwardJump()
    if (kbc.click) handleClickThings()
  })
 ```

Alternatively, you can destructure the control rune and maintain reactivity using $derived:
```js
const { forward, jump, click } = $derived(useKbc());

$effect(() => {
  if (forward) handleMoveForward()
  if (forward && jump) handleForwardJump()
  if (click) handleClickThings()
})

```
**Note:** The keys and events will "emit" their respective `event` objects when they occur, otherwise they will "emit" `false`

# `<KeyboardControls />` Properties

```ts
// The keyboard input configuration. Default is []
config: KeyboardControl[] = [];

// The event property to listen for key events. Default is "key"
eventProperty: string = "key";

// A boolean to help with debugging. This will log your input properties, and the value returned by event[eventProperty]
debug: boolean = false;
```

# Predefined Configs
Some predefined key configurations are available out-of-the-box to speed up development. You can extend these or easily rename controls.

```html
<KeyboardControls config={wasdConfig()}>
  <BrowserGame />
</KeyboardControls>
```

<details>
  <summary>wasdConfig</summary>

```ts
[
  { name: 'w', keys: ['w', 'W', 'ArrowUp'] },
  { name: 'a', keys: ['a', 'A', 'ArrowLeft'] },
  { name: 's', keys: ['s', 'S', 'ArrowDown'] },
  { name: 'd', keys: ['d', 'D', 'ArrowRight'] },
  { name: 'shift', keys: ['Shift'] },
  { name: 'space', keys: [' ', 'Space'] }
]
```
</details>

<details>
  <summary>alphaConfig</summary>

```ts
[
  { name: 'a', keys: ['a', 'A'] },
  { name: 'b', keys: ['b', 'B'] },
  { name: 'c', keys: ['c', 'C'] },
  { name: 'd', keys: ['d', 'D'] },
  { name: 'e', keys: ['e', 'E'] },
  { name: 'f', keys: ['f', 'F'] },
  { name: 'g', keys: ['g', 'G'] },
  { name: 'h', keys: ['h', 'H'] },
  { name: 'i', keys: ['i', 'I'] },
  { name: 'j', keys: ['j', 'J'] },
  { name: 'k', keys: ['k', 'K'] },
  { name: 'l', keys: ['l', 'L'] },
  { name: 'm', keys: ['m', 'M'] },
  { name: 'n', keys: ['n', 'N'] },
  { name: 'o', keys: ['o', 'O'] },
  { name: 'p', keys: ['p', 'P'] },
  { name: 'q', keys: ['q', 'Q'] },
  { name: 'r', keys: ['r', 'R'] },
  { name: 's', keys: ['s', 'S'] },
  { name: 't', keys: ['t', 'T'] },
  { name: 'u', keys: ['u', 'U'] },
  { name: 'v', keys: ['v', 'V'] },
  { name: 'w', keys: ['w', 'W'] },
  { name: 'x', keys: ['x', 'X'] },
  { name: 'y', keys: ['y', 'Y'] },
  { name: 'z', keys: ['z', 'Z'] }
]
```

</details>

<details>
  <summary>numericConfig</summary>

```ts
[
  { name: 'key0', keys: ['0'] },
  { name: 'key1', keys: ['1'] },
  { name: 'key2', keys: ['2'] },
  { name: 'key3', keys: ['3'] },
  { name: 'key4', keys: ['4'] },
  { name: 'key5', keys: ['5'] },
  { name: 'key6', keys: ['6'] },
  { name: 'key7', keys: ['7'] },
  { name: 'key8', keys: ['8'] },
  { name: 'key9', keys: ['9'] }
]
```
</details>

## Modifying Predefined Config Names
Understandably you might want to rename some of these predefined controls. For example: you're using the `wasdConfig` but want to rename _space_ to be _jump_. 

Just pass in a name mapping object when you invoke the config:

```ts
wasdConfig({ space: 'jump' })
```

Now your control rune properties will be named `w, a, s, d, shift, jump`

# Types

### KeyboardControl
```ts
{
  name: string;
  keys?: KeyConfig[];
  events?: KbcEvent[];
}
```

### KeyConfig
```ts
string | string[]
```

### KbcEvent
```ts
'click' | 'pointerdown' | 'pointerup' | 'touchstart' | 'touchend' | 'scroll'
```
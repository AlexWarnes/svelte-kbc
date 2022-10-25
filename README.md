# svelte-kbc (Keyboard Controls)

Configure keyboard inputs for any Svelte app.

# Getting Started

Create an array of controls with a name and key(s).

```js
const config = [
  // individual key presses
  { name: 'flyUp', keys: ['ArrowUp', 'w', 'W'] },

  // simultaneous key presses 
  { name: 'fire', keys: [['Shift', 'F']]}
]
```

Wrap your application (or a part of your application) in the `KeyboardControls`. Any child component can then subscribe to the controls.

```html
<KeyboardControls {config}>
  <BrowserGame />
</KeyboardControls>
```

The `useKeyboardControls()` hook will return all your controls as stores with boolean values. From there, handle the controls however you need to:

```html
<script>
  import { useKeyboardControls } from 'svelte-kbc';

  const { flyUp, fire } = useKeyboardControls();

  $: if ($flyUp) handleFlyUp();
  $: if ($fire) handleFire();
</script>
```

# `KeyboardControls` Properties

```ts
// The keyboard input configuration. Default is []
config: KeyboardControl[] = [];

// The event property to listen for. Default is "key"
eventProperty: string = "key";

// A boolean to help with debugging. This will log your input properties, and the value returned by event[eventProperty]
debug: boolean = false;
```

# Types

### KeyboardControl
```ts
{
  name: string;
  keys: KeyConfig[];
}
```

### KeyConfig
```ts
string | string[]
```

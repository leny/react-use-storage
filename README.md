# react-use-storage

> [React Hook](https://reactjs.org/docs/hooks-intro.html) to handle local and session storage

* * *

## Install

	npm install --save react-use-storage

## Usage

See this hooks as a *useState* hooks that syncs with **local/session storage**.

> ☝️ **NOTE:** if the value of the key in the storage change from another portion of your code, the hook keep it in sync and re-render your component with the new value.

### LocalStorage

```javascript
	import {useLocalStorage} from "react-use-storage";

	// ...
		const [value, setValue, removeValue] = useLocalStorage("key", "default value");

```

### SessionStorage

```javascript
	import {useSessionStorage} from "react-use-storage";

	// ...
		const [value, setValue, removeValue] = useSessionStorage("key", "default value");

```

## License

[UNLICENSED (public domain)](./LICENSE)

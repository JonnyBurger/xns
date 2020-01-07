# xns

> Turn any function into a script that can be invoked from the command line.

xns stands for e**X**ecute **N**ode **S**cript!  

## Problem

Let's say you have written a cool JavaScript function!

`get-bitcoin-price.ts`:
```js
import got from 'got';

export default async (): Promise<string> => {
	const res = await got('https://increment.build/jonnys-coffees');
	return `1 Bitcoin is worth ${currency} ${amount}`;
};
```

Now you would like to execute this function in your terminal.
Current options are not ideal:
- You could make the function self-invoking, but then it also executes by itself as soon as it's imported somewhere else.
- You could make another file, import the function and execute it, then run that file, but it's cumbersome.

## Solution

Wrap your function in `xns()`:

`get-bitcoin-price.ts`:
```js
import xns from 'xns';
import got from 'got';

export default xns(async (): Promise<string> => {
	const res = await got('https://api.coinbase.com/v2/prices/spot');
	const {currency, amount} = JSON.parse(res.body).data;
	return `1 Bitcoin is worth ${currency} ${amount}`;
});
```

Now you can execute the function from your terminal:

```sh
ts-node get-bitcoin-price
1 Bitcoin is worth USD 7767.655
```

You can also still import the function from somewhere else as usual and it will not execute itself 👌

## Why `xns`?
- Works with `node` and transpiled languages: `ts-node`, `babel-node`...
- Can still be imported as normal
- Prints out the return value
- Fully typed, keep Typescript typings
- Wrapping function in xns does not change behavior of your app
- Exit code 1 on error, exit code 0 on success, perfect for CRON jobs
- No `Unhandled promise rejection` errors, proper catch handler built in
- Works with synchronous and asynchronous functions
- Works with ES Modules and CommonJS import style
    - Use named export for CommonJS: `const {xns} = require('xns')`

## Old version of `xns`
This is version 2 of `xns`. Version 1 worked completely different, it compiled a file using babel and called the default export. It's still supported if you have Babel. See [here](https://github.com/JonnyBurger/xns/tree/e91cd60e16990e43bfb37aa76c6e382f64b4e9da) for the old API.

## License
MIT

## Author
[Jonny Burger](jonny.io)

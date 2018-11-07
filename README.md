# xns

> _Execute node script_

## Usage

```
npx xns index.js
```

Pass in the Javascript file you would like to execute.

## Why `xns`?
You have a file which exports a function:

```js
// index.js
export default async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return 1 + 1;
}
```

You would like to execute this function. Usually you have to create another file which imports this function and executes it.
You also have to make sure to call .catch() to log the exception.

xns simply executes the default export of the file that you pass in and also quits if the promise resolves, and logs the error if the promise rejects.

## License
MIT

## Author
[Jonny Burger](jonny.io)

## Easy Observer

Observe a simple property change and trigger listener.

[![Build Status](https://travis-ci.org/fun-coder/easy-observer.svg?branch=master)](https://travis-ci.org/fun-coder/easy-observer)

### Install

```bash
npm install easy-observer
```

### Usage

Watch property which is simple value;

```javascript
import { observeValue } from 'easy-observer';

let a = { name: 'Hello' };

observeValue(a, 'name', (previous, current) => console.log(`${previous} -> ${current}`));

a.name = 'World'; // => Hello -> World;
```

Watch function;

```javascript
import { observeFn, observable } from 'easy-observer';

const a = observable({ name: 'first', age: 2 });
const b = observable({ name: 'second' });
const c = { name: 1 };
let count = 0;

observeFn(() => {
  a.name + b.name + c.name;
  count++;
}); // count = 1; Auto run once;

a.name = 'x'; // count = 2; Trigger rerun the function when observed property changed

b.name = 'xx'; // count = 3

a.age = 3; // count = 3; Not trigger when change the observed property which is not used in the function

c.name = 2; // count = 3; Not trigger when change the non-observed property
```

### Run Test

```bash
npm install 

npm test
```

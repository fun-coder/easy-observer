## Easy Observer

Observe a simple property change and trigger listener.

[![Build Status](https://travis-ci.org/fun-coder/easy-observer.svg?branch=master)](https://travis-ci.org/fun-coder/easy-observer)

### Install

```bash
npm install easy-observer
```

### Usage

```javascript
import { observe } from 'easy-observer';

let a = { name: 'Hello' };

observe(a, 'name', (previous, current) => {
	// previous is 'Hello'.
	// current is 'World'.
});

a.name = 'World';
```

### Run Test

```
npm install 

npm test
```

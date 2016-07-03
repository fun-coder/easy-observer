## Easy Observer

Observe a simple property change and trigger listener.


### Install

```bash
npm install easy-observer
```

### Usage

```javascript
import { observe } from 'obj-id';

let a = {
	name: 'Hello'
};

observe(a, 'name', (previous, current) => {
	# previous is 'Hello'.
	# current is 'World'.
});

a.name = 'World';
```

### Run Test

```
npm install 

npm test
```

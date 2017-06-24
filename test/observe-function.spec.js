'use strict';
import { expect } from 'chai';
import { observeFn, observable } from '../index';

describe('Observe function', () => {

  it('should trigger rerun when observed property changed', () => {
    const a = observable({ name: 'first', age: 2 });
    const b = observable({ name: 'second' });
    const c = { name: 1 };
    let count = 0;

    observeFn(() => {
      a.name + b.name + c.name;
      count++;
    });

    expect(count).to.equal(1, 'Auto run once');
    a.name = 'x';
    expect(count).to.equal(2, 'Trigger rerun the function when observed property changed');
    b.name = 'xx';
    expect(count).to.equal(3, 'Trigger rerun the function when observed property changed');
    a.age = 3;
    expect(count).to.equal(3, 'Not trigger when change the non-observed property');
    c.name = 2;
    expect(count).to.equal(3, 'Not trigger when change the observed property which is not used in the function');
  });

});
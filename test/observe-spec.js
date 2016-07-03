"use strict";

import {observe} from '../libs/index';
import assert from 'assert';

describe('Observe', () => {
  let item, name;

  beforeEach(() => {
    item = Object.create(null);
    name = 'Hello';
  });

  it('should trigger a listener when set the observed property', (done) => {
    observe(item, 'name', (previousValue, currentValue) => {
      assert.equal(undefined, previousValue, 'should give previous value');
      assert.equal(name, currentValue, 'should give current value');
      done();
    });

    item.name = name;
  });

  it('should save the previous anwser when observe a property', (done) => {
    let person = { name: 'Hello'};

    observe(person, 'name', (previous, current) => {
      assert.equal('Hello', previous);
      assert.equal('World', current);
      done();
    });

    person.name = 'World';
  });

  it('should throw an exception when observer a getter property', (done) => {
    Object.defineProperty(item, 'name', {
      configurable: true,
      enumerable: true,
      get: () => name
    });

    assert.throws(() => {
      observe(item, 'name', () => {
      });
    }, (err) => {
      assert.equal('Easy-observer can not observe a getter property.', err.message);
      done();
    });
  });


  it('should throw an exception when observer a un-configurable property.', (done) => {
    Object.defineProperty(item, 'name', {
      enumerable: true,
      value: name
    });

    assert.throws(() => {
      observe(item, 'name', () => {
      });
    }, (err) => {
      assert.equal('Easy-observer can not observe a un-configurable property.', err.message);
      done();
    });
  });

  it('should throw an exception when observer a un-writable property.', (done) => {
    Object.defineProperty(item, 'name', {
      configurable: true,
      enumerable: true,
      writable: false,
      value: name
    });

    assert.throws(() => {
      observe(item, 'name', () => {
      });
    }, (err) => {
      assert.equal('Easy-observer can not observe a un-writable property.', err.message);
      done();
    });
  });

});

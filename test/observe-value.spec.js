"use strict";

import { observeValue } from '../index';
import { expect } from 'chai';
import Promise from 'bluebird';

describe('Observe value', () => {
  let item, name;
  let emptyListener = () => {
  };

  beforeEach(() => {
    item = new Object();
    name = 'Hello';
  });

  it('should trigger a listener when set the observed property', (done) => {
    observeValue(item, 'name', (previousValue, currentValue) => {
      expect(previousValue).to.be.undefined;
      expect(currentValue).to.eql(name);
      done();
    });

    item.name = name;
  });

  it('should save the previous anwser when observeValue a property', (done) => {
    let person = { name: 'Hello' };

    observeValue(person, 'name', (previous, current) => {
      expect(previous).to.eql('Hello');
      expect(current).to.eql('World');
      done();
    });

    person.name = 'World';
  });

  it('should throw an exception when observer a getter property', () => {
    Object.defineProperty(item, 'name', {
      configurable: true,
      enumerable: true,
      get: () => name
    });

    expect(() => observeValue(item, 'name', emptyListener))
      .to.throw('Easy-observer can not observeValue a getter property.');
  });


  it('should throw an exception when observer a un-configurable property.', () => {
    Object.defineProperty(item, 'name', {
      enumerable: true,
      value: name
    });

    expect(() => observeValue(item, 'name', emptyListener))
      .to.throw('Easy-observer can not observeValue a un-configurable property.');
  });

  it('should throw an exception when observer a un-writable property.', () => {
    Object.defineProperty(item, 'name', {
      configurable: true,
      enumerable: true,
      writable: false,
      value: name
    });

    expect(() => observeValue(item, 'name', emptyListener))
      .to.throw('Easy-observer can not observeValue a un-writable property.');
  });

  it('should observeValue by multiple observer', (done) => {

    let firstDefer = Promise.defer();
    let secondDefer = Promise.defer();

    observeValue(item, 'name', (previous, current) => {
      firstDefer.resolve(previous);
    });

    observeValue(item, 'name', (previous, current) => {
      secondDefer.resolve(current);
    });

    Promise.all([
      firstDefer.promise, secondDefer.promise
    ]).then(([previous, current]) => {
      expect(previous).to.be.undefined;
      expect(current).to.eql(name);
      done();
    });

    item.name = name;
  });
});

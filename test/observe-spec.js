"use strict";

import {observe} from '../libs/index';
import {expect} from 'chai';

import assert from 'assert';

describe('Observe', () => {
  let item, name;
  let emptyListener = () => {
  };

  beforeEach(() => {
    item = Object.create(null);
    name = 'Hello';
  });

  it('should trigger a listener when set the observed property', (done) => {
    observe(item, 'name', (previousValue, currentValue) => {
      expect(previousValue).to.be.undefined;
      expect(currentValue).to.eql(name);
      done();
    });

    item.name = name;
  });

  it('should save the previous anwser when observe a property', (done) => {
    let person = {name: 'Hello'};

    observe(person, 'name', (previous, current) => {
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

    expect(() => observe(item, 'name', emptyListener))
      .to.throw('Easy-observer can not observe a getter property.');
  });


  it('should throw an exception when observer a un-configurable property.', () => {
    Object.defineProperty(item, 'name', {
      enumerable: true,
      value: name
    });

    expect(() => observe(item, 'name', emptyListener))
      .to.throw('Easy-observer can not observe a un-configurable property.');
  });

  it('should throw an exception when observer a un-writable property.', () => {
    Object.defineProperty(item, 'name', {
      configurable: true,
      enumerable: true,
      writable: false,
      value: name
    });

    expect(() => observe(item, 'name', emptyListener))
      .to.throw('Easy-observer can not observe a un-writable property.');
  });

});

"use strict";
import { collectObserver } from '../observe-function';

const defaultDescriptor = {
  enumerable: true,
  configurable: true,
  value: undefined
};

export class ValueObserver {

  static from(target, property) {
    const descriptor = Object.getOwnPropertyDescriptor(target, property);
    return new ValueObserver(descriptor);
  }

  descriptor;
  listeners = [];

  constructor(descriptor) {
    this.setDescriptor(descriptor);
  }

  setDescriptor(descriptor) {
    this.check(descriptor);
    const desc = Object.assign({}, defaultDescriptor, descriptor);
    this.descriptor = desc;
    this.value = desc.value;
  }

  getter() {
    collectObserver(this);
    return this.value;
  }

  setter(value) {
    if (value === this.value) return;
    const tmp = this.value;
    this.value = value;
    this.listeners.forEach(listener => listener(tmp, value));
  }

  register(listener) {
    listener instanceof Function
    && this.listeners.indexOf(listener) === -1
    && this.listeners.push(listener);
  }

  get propertyDescriptor() {
    return {
      enumerable: this.descriptor.enumerable,
      configurable: this.descriptor.configurable,
      get: ::this.getter,
      set: ::this.setter
    };
  }

  check(descriptor) {
    if (!descriptor) return;
    if (!descriptor.configurable) throw new Error('Easy-observer can not observeValue a un-configurable property.');
    if (descriptor.get) throw new Error('Easy-observer can not observeValue a getter property.');
    if (!descriptor.writable) throw new Error('Easy-observer can not observeValue a un-writable property.');
  }
}
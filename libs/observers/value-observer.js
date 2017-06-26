'use strict';
import { collectObserver } from '../observe-function';
import { unqiue } from './id';
import { bindFn, bindThis } from './function-bind';

const defaultDescriptor = {
  enumerable: true,
  configurable: true,
  value: undefined
};

@bindFn
export class ValueObserver {

  @unqiue id;
  descriptor;
  listeners = [];

  constructor(target, property) {
    const descriptor = Object.getOwnPropertyDescriptor(target, property);
    this.setDescriptor(descriptor);
  }

  setDescriptor(descriptor) {
    this.check(descriptor);
    const desc = Object.assign({}, defaultDescriptor, descriptor);
    this.descriptor = desc;
    this.value = desc.value;
  }

  @bindThis
  getter() {
    collectObserver(this);
    return this.value;
  }

  @bindThis
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

  unregister(listener) {
    const index = this.listeners.indexOf(listener);
    this.listeners.splice(index, 1);
  }

  get propertyDescriptor() {
    return {
      enumerable: this.descriptor.enumerable,
      configurable: this.descriptor.configurable,
      get: this.getter,
      set: this.setter
    };
  }

  check(descriptor) {
    if (!descriptor) return;
    if (!descriptor.configurable) throw new Error('Easy-observer can not observeValue a un-configurable property.');
    if (descriptor.get) throw new Error('Easy-observer can not observeValue a getter property.');
    if (!descriptor.writable) throw new Error('Easy-observer can not observeValue a un-writable property.');
  }
}
"use strict";

export default class Observer {
  constructor(obj, property) {
    this.obj = obj;
    this.property = property;
    this.listeners = [];
    this.check(obj, property);
    this.value = obj[property];
  }

  getter() {
    return this.value;
  }

  setter(value) {
    let tmp = this.value;
    this.value = value;
    this.listeners.forEach(listener => listener(tmp, value));
  }

  register(listener) {
    this.listeners.push(listener);
  }

  get descriptor() {
    return {
      enumerable: true,
      configurable: true,
      get: this.getter.bind(this),
      set: this.setter.bind(this)
    };
  }

  check(obj, property) {
    let descriptor = Object.getOwnPropertyDescriptor(obj, property);
    if (!descriptor) return;
    if (!descriptor.configurable) throw new Error('Easy-observer can not observe a un-configurable property.');
    if (descriptor.get) throw new Error('Easy-observer can not observe a getter property.');
    if (!descriptor.writable) throw new Error('Easy-observer can not observe a un-writable property.');
  }
}
'use strict';

export const bindFn = target => {
  return class extends target {
    constructor(...args) {
      super(...args);
      (target._bindFns || []).forEach(fn => this[fn.name] = this[fn.name].bind(this));
    }
  };
};

export const bindThis = (target, propertyName) => {
  target._bindFns = target._bindFns || [];
  target._bindFns.push(propertyName);
};
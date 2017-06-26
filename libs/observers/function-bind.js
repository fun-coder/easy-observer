'use strict';

const key = Symbol('_bindFns');

const getFns = target => {
  target[key] = target[key] || [];
  return target[key];
};

export const bindFn = target => {
  return class extends target {
    constructor(...args) {
      super(...args);
      getFns(target.prototype).forEach(fn => this[fn] = ::this[fn]);
    }
  };
};

export const bindThis = (target, propertyName) => {
  const fns = getFns(target);
  fns.push(propertyName);
};
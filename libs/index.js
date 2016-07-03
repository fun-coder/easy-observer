"use strict";
import Observer from './observer';

export const observe = (obj, property, listener) => {

  let observer = new Observer(obj, property);

  observer.register(listener);

  Object.defineProperty(obj, property, observer.descriptor);
};

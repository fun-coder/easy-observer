"use strict";
import getObserver from './observer-map';

export const observe = (target, property, listener) => {
  let observer = getObserver(target, property);

  observer.register(listener);

  Object.defineProperty(target, property, observer.descriptor);
};

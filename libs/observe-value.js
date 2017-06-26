'use strict';
import { getObserver } from './get-observer';
import { ValueObserver } from './observers/value-observer';

export const observeValue = (target, property, listener) => {
  let observer = getObserver(target, property, () => new ValueObserver(target, property));
  observer.register(listener);
  Object.defineProperty(target, property, observer.propertyDescriptor);
  return observer;
};
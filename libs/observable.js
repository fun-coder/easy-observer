"use strict";
import { observeValue } from './observe-value';

export const observable = target => {
  const result = {};
  for (const propertyName in target) {
    let observer = observeValue(result, propertyName);
    let descriptor = Object.getOwnPropertyDescriptor(target, propertyName);
    observer.setDescriptor(descriptor);
  }
  return result;
};
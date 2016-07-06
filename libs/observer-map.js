"use strict";
import Observer from './observer';

const key = '___observers___';

let createObserverMap = (target) => {
  var map = {};

  Object.defineProperty(target, key, {
    value: map,
    writable: true,
    configurable: true,
    enumerable: false
  });

  return map;
};

export default (target, property) => {
  var map = target.hasOwnProperty(key) ? target[key] : createObserverMap(target);

  if (!map[property]) map[property] = new Observer(target, property);

  return map[property];
};
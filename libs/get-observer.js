"use strict";

const key = '___observers___';

let createObserverMap = (target) => {
  const map = {};

  Object.defineProperty(target, key, {
    value: map,
    writable: true,
    configurable: true,
    enumerable: false
  });

  return map;
};

export const getObserver = (target, property, setObserver) => {
  const map = target.hasOwnProperty(key) ? target[key] : createObserverMap(target);
  if (!map[property]) map[property] = setObserver();
  return map[property];
};
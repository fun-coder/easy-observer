'use strict';
import { CombineObserver } from './observers/combine-observer';
let currentInstance = null;

class FunctionObserver {

  fn;
  combinedObserver = new CombineObserver();

  constructor(fn) {
    this.fn = fn;
    this.observe = ::this.observe;
    this.combinedObserver.register(this.observe);
    this.observe();
  }

  observe() {
    this.clearObservers();
    currentInstance = this;
    this.fn();
    currentInstance = null;
  }

  add(observer) {
    this.combinedObserver.add(observer);
  }

  clearObservers() {
    if (this.combinedObserver) this.combinedObserver.unobserve();
  }
}

export const collectObserver = observer => {
  if (currentInstance) currentInstance.add(observer);
};
export const observeFn = fn => new FunctionObserver(fn);
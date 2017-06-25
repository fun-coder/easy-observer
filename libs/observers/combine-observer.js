'use strict';

export class CombineObserver {
  observers = [];
  listeners = [];

  constructor() {
    this.listener = ::this.listener;
  }

  add(...observers) {
    observers.forEach(observer => this.addOne(observer));
  }

  addOne(observer) {
    this.observers.indexOf(observer) === -1
    && this.observers.push(observer)
    && observer.register(this.listener);
  }

  remove(...observers) {
    observers.forEach(observer => this.removeOne(observer));
  }

  removeOne(observer) {
    const index = this.observers.indexOf(observer);
    this.observers[index].unregister(this.listener);
    this.observers.splice(index, 1);
  }

  register(listener) {
    this.listeners.push(listener);
  }

  unregister(listener) {
    const index = this.listeners.indexOf(listener);
    this.listeners.splice(index, 1);
  }

  unobserve() {
    this.observers.forEach(observer => observer.unregister(this.listener));
    this.observers = [];
  }

  listener(oldValue, newValue) {
    this.listeners.forEach(listener => listener(oldValue, newValue));
  }
}

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _observer = require('./observer');

var _observer2 = _interopRequireDefault(_observer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var key = '___observers___';

var createObserverMap = function createObserverMap(target) {
  var map = {};

  Object.defineProperty(target, key, {
    value: map,
    writable: true,
    configurable: true,
    enumerable: false
  });

  return map;
};

exports.default = function (target, property) {
  var map = target.hasOwnProperty(key) ? target[key] : createObserverMap(target);

  if (!map[property]) map[property] = new _observer2.default(target, property);

  return map[property];
};
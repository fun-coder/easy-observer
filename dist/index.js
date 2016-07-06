"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.observe = undefined;

var _observerMap = require("./observer-map");

var _observerMap2 = _interopRequireDefault(_observerMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var observe = exports.observe = function observe(target, property, listener) {
  var observer = (0, _observerMap2.default)(target, property);

  observer.register(listener);

  Object.defineProperty(target, property, observer.descriptor);
};
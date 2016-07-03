"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _observer = require("./observer");

var _observer2 = _interopRequireDefault(_observer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, property, listener) {

  var observer = new _observer2.default(obj, property);

  observer.register(listener);

  Object.defineProperty(obj, property, observer.descriptor);
};
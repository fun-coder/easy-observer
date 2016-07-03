"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Observer = function () {
  function Observer(obj, property) {
    _classCallCheck(this, Observer);

    this.obj = obj;
    this.property = property;
    this.listeners = [];
    this.check(obj, property);
  }

  _createClass(Observer, [{
    key: 'getter',
    value: function getter() {
      return this.value;
    }
  }, {
    key: 'setter',
    value: function setter(value) {
      var tmp = this.value;
      this.value = value;
      this.listeners.forEach(function (listener) {
        return listener(tmp, value);
      });
    }
  }, {
    key: 'register',
    value: function register(listener) {
      this.listeners.push(listener);
    }
  }, {
    key: 'check',
    value: function check(obj, property) {
      var descriptor = Object.getOwnPropertyDescriptor(obj, property);
      if (!descriptor) return;
      if (!descriptor.configurable) throw new Error('Easy-observer can not observe a un-configurable property.');
      if (descriptor.get) throw new Error('Easy-observer can not observe a getter property.');
      if (!descriptor.writable) throw new Error('Easy-observer can not observe a un-writable property.');
    }
  }, {
    key: 'descriptor',
    get: function get() {
      return {
        enumerable: true,
        configurable: true,
        get: this.getter.bind(this),
        set: this.setter.bind(this)
      };
    }
  }]);

  return Observer;
}();

exports.default = Observer;
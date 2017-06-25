'use strict';

import objId from 'obj-id';

export const unqiue = (target, propertyName, descriptor) => {
  return {
    configurable: descriptor.configurable,
    enumerable: descriptor.enumerable,
    writable: false,
    get: function () {
      return objId(this);
    }
  };
};
'use strict';

/*jslint browser: true, nomen: true, unparam: true, indent: 2*/
/*global define*/

define(["jquery", "lodash"], function ($, _) {
  var main = (function () {
    var store = {};

    function getOrElse(id, load) {
      var value;
      if (store.hasOwnProperty(id)) {
        return store[id];
      }

      value = load(id);
      store[id] = value;
      return value;
    }

    return {
      getOrElse: getOrElse
    };
  }());

  return main;
});

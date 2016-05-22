'use strict';

/*jslint browser: true, nomen: true, unparam: true, indent: 2*/
/*global define*/

define(["jquery", "lodash"], function ($, _) {
  var main = (function () {
    var store = {};

    function loadText(url, success, error) {
      if (store.hasOwnProperty(url)) {
        success(store[url]);
      } else {
        $.ajax({
          type: "GET",
          dataType: "text",
          url: url,
          success: success,
          error: function (ignore, message) {
            error(message);
          }
        });
      }
    }

    function loadJSON(url, success) {
      if (store.hasOwnProperty(url)) {
        success(store[url]);
      } else {
        $.getJSON(url, success);
      }
    }

    return {
      loadText: loadText,
      loadJSON: loadJSON
    };
  }());

  return main;
});

'use strict';

/*jslint browser: true, unparam: true, indent: 2*/
/*global define*/

define(["jquery"], function ($) {
  var main = (function () {
    function init(load, defaultKey) {
      $(window).on("popstate", function (event) {
        var key = event.originalEvent.state
          ? event.originalEvent.state.key
          : defaultKey;
        load(key);
      });
    }

    function install(load, parseKey) {
      $("a").filter(function (i, a) {
        return a.host === window.location.host;
      }).each(function (i, a) {
        $(a).click(function (e) {
          if (e.which !== 1) {
            return true;
          }

          var url = $(a).attr("href"),
            key = parseKey(url);
          history.pushState({key: key}, "", url);
          load(key);
          $("html, body").animate({scrollTop: 0}, "fast");
          return false;
        });
      });
    }

    return {
      init: init,
      install: install
    };
  }());

  return main;
});

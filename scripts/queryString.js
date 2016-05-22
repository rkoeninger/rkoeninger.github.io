'use strict';

/*jslint browser: true, nomen: true, unparam: true, indent: 2*/
/*global define*/

define(["lodash"], function (_) {
  var plusGlobalRegex = /\+/g;

  function fromUrl(url) {
    var parser = document.createElement("a");
    parser.href = url;
    return parser.search;
  }

  function get(qs, key) {
    var qsParts, argVal;

    if (qs.length === 0) {
      return "";
    }

    qsParts = qs.substr(1).split("&");

    if (!(qsParts || key)) {
      return "";
    }

    argVal = _.find(qsParts, function (qsPart) {
      var argValSplit = qsPart.split("=");
      return argValSplit.length === 2 && argValSplit[0] === key;
    });

    if (argVal) {
      return decodeURIComponent(argVal.split("=")[1].replace(plusGlobalRegex, " "));
    }

    return "";
  }

  function all(qs) {
    return qs.length < 2 || qs[0] !== "?" || qs.indexOf("&") !== -1 || qs.indexOf("=") !== -1
      ? null
      : qs.substring(1);
  }

  return {
    fromUrl: fromUrl,
    get: get,
    all: all
  };
});

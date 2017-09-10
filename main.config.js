'use strict';

/*jslint browser: true, regexp: true, indent: 2*/
/*global require*/

require.config({
  paths: {
    "jquery": "//cdnjs.cloudflare.com/ajax/libs/jquery/1.12.3/jquery.min",
    "lodash": "//cdnjs.cloudflare.com/ajax/libs/lodash.js/4.12.0/lodash.min",
    "marked": "//cdnjs.cloudflare.com/ajax/libs/marked/0.3.5/marked.min",
    "hljs": "/scripts/highlight.pack",
    "preprocessor": "/scripts/preprocessor",
    "cache": "/scripts/cache",
    "queryString": "/scripts/queryString",
    "pushState": "/scripts/pushState",
    "main": "/main"
  },
  shim: {
    "hljs": {
      exports: "hljs"
    }
  }
});

require(["main"], function (main) {
  main.init();
});

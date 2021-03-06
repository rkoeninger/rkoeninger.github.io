'use strict';

/*jslint browser: true, regexp: true, indent: 2*/
/*global require*/

require.config({
  paths: {
    "jasmine": "//cdnjs.cloudflare.com/ajax/libs/jasmine/2.3.4/jasmine.min",
    "jasmine-html": "//cdnjs.cloudflare.com/ajax/libs/jasmine/2.3.4/jasmine-html.min",
    "jasmine-boot": "//cdnjs.cloudflare.com/ajax/libs/jasmine/2.3.4/boot.min",
    "jquery": "//cdnjs.cloudflare.com/ajax/libs/jquery/1.12.3/jquery.min",
    "lodash": "//cdnjs.cloudflare.com/ajax/libs/lodash.js/4.12.0/lodash.min",
    "marked": "//cdnjs.cloudflare.com/ajax/libs/marked/0.3.5/marked.min",
    "hljs": "/scripts/highlight.pack",
    "preprocessor": "/scripts/preprocessor",
    "cache": "/scripts/cache",
    "queryString": "/scripts/queryString",
    "pushState": "/scripts/pushState",
    "main": "/main",
    "main-spec": "/spec/main.spec"
  },
  shim: {
    "jasmine-html": {
      deps: ["jasmine"]
    },
    "jasmine-boot": {
      deps: ["jasmine", "jasmine-html"]
    },
    "hljs": {
      exports: "hljs"
    }
  }
});

require(["jasmine-boot"], function () {
  require(["main-spec"], function () {
    window.onload(); // Trigger jasmine
  });
});

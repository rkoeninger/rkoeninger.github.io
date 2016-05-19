'use strict';

/*jslint browser: true, regexp: true, indent: 2*/
/*global require, MathJax*/

require.config({
  paths: {
    "jasmine": "//cdnjs.cloudflare.com/ajax/libs/jasmine/2.3.4/jasmine.min",
    "jasmine-html": "//cdnjs.cloudflare.com/ajax/libs/jasmine/2.3.4/jasmine-html.min",
    "jasmine-boot": "//cdnjs.cloudflare.com/ajax/libs/jasmine/2.3.4/boot.min",
    "jquery": "//cdnjs.cloudflare.com/ajax/libs/jquery/1.11.3/jquery.min",
    "lodash": "//cdnjs.cloudflare.com/ajax/libs/lodash.js/4.12.0/lodash.min",
    "webcomponents": "//cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/0.7.18/webcomponents-lite.min",
    "marked": "//cdnjs.cloudflare.com/ajax/libs/marked/0.3.2/marked.min",
    "mathjax": "//cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML&amp;delayStartupUntil=configured",
    "hljs": "/highlight.pack",
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
    "mathjax": {
      exports: "MathJax",
      init: function () {
        MathJax.Hub.Config({
          tex2jax: {inlineMath: [["$", "$"]]},
          skipStartupTypeset: true
        });
        return MathJax;
      }
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

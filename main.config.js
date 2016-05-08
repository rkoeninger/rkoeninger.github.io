'use strict';

/*jslint browser: true, regexp: true, indent: 2*/
/*global require, MathJax*/

require.config({
  paths: {
    "jquery": "//cdnjs.cloudflare.com/ajax/libs/jquery/1.11.3/jquery.min",
    "lodash": "//cdnjs.cloudflare.com/ajax/libs/lodash.js/3.10.1/lodash.min",
    "webcomponents": "//cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/0.7.18/webcomponents-lite.min",
    "marked": "//cdnjs.cloudflare.com/ajax/libs/marked/0.3.2/marked.min",
    "mathjax": "//cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML&amp;delayStartupUntil=configured",
    "hljs": "//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.3.0/highlight.min",
    "main": "/main"
  },
  shim: {
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

require(["main"], function (main) {
  main.init();
});

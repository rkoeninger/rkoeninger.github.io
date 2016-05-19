'use strict';

/*jslint browser: true, regexp: true, indent: 2*/
/*global require, MathJax*/

require.config({
  paths: {
    "jquery": "//cdnjs.cloudflare.com/ajax/libs/jquery/1.12.3/jquery.min",
    "lodash": "//cdnjs.cloudflare.com/ajax/libs/lodash.js/4.12.0/lodash.min",
    "marked": "//cdnjs.cloudflare.com/ajax/libs/marked/0.3.5/marked.min",
    "mathjax": "//cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML&amp;delayStartupUntil=configured",
    "hljs": "/highlight.pack",
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

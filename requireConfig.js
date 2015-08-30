'use strict';

/*jslint browser: true, regexp: true, indent: 4*/
/*global require, MathJax*/

require.config({
    paths: {
        "jquery": "//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min",
        "marked": "//cdnjs.cloudflare.com/ajax/libs/marked/0.3.2/marked.min",
        "mathjax": "//cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML&amp;delayStartupUntil=configured",
        "main": "/main"
    },
    shim: {
        "mathjax": {
            exports: "MathJax",
            init: function () {
                MathJax.Hub.Config({tex2jax: {inlineMath: [["$", "$"]]}});
                MathJax.Hub.Startup.onload();
                return MathJax;
            }
        }
    }
});

require(["main"], function (main) {
    main.init();
});

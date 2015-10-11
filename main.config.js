'use strict';

/*jslint browser: true, regexp: true, indent: 4*/
/*global require, MathJax*/

require.config({
    paths: {
        "jquery": "//cdnjs.cloudflare.com/ajax/libs/jquery/1.11.3/jquery.min",
        "marked": "//cdnjs.cloudflare.com/ajax/libs/marked/0.3.2/marked.min",
        "mathjax": "//cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML&amp;delayStartupUntil=configured",
        "hljs": "//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.3/highlight.min",
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

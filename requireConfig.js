'use strict';

/*jslint browser: true, regexp: true, indent: 4*/
/*global require*/

require.config({
    paths: {
        "jquery": "//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min",
        "marked": "//cdnjs.cloudflare.com/ajax/libs/marked/0.3.2/marked.min",
        "main": "/main"
    }
});

require(["main"], function (main) {
    main.init();
});

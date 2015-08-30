'use strict';

/*jslint browser: true, regexp: true, indent: 4*/
/*global require*/

require.config({
    paths: {
        "jquery": "//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min",
        "main": "/main",
        "marked": "/marked"
    }
});

require(["main"], function (main) {
    main.init();
});

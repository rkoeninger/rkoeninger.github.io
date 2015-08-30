'use strict';

/*jslint browser: true, regexp: true, indent: 4*/
/*global require*/

require.config({
    paths: {
        "jquery": "//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min",
        "jasmine": "//cdnjs.cloudflare.com/ajax/libs/jasmine/2.3.4/jasmine.min",
        "jasmine-html": "//cdnjs.cloudflare.com/ajax/libs/jasmine/2.3.4/jasmine-html.min",
        "jasmine-boot": "//cdnjs.cloudflare.com/ajax/libs/jasmine/2.3.4/boot.min",
        "marked": "//cdnjs.cloudflare.com/ajax/libs/marked/0.3.2/marked.min",
        "main-spec": "/spec/main.spec",
        "main": "/main"
    },
    shim: {
        "jasmine-html": {
            deps: ["jasmine"]
        },
        "jasmine-boot": {
            deps: ["jasmine", "jasmine-html"]
        }
    }
});

require(["jasmine-boot"], function () {
    require(["main-spec"], function () {
        window.onload(); // Trigger jasmine
    });
});

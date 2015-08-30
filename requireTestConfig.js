'use strict';

/*jslint browser: true, regexp: true, indent: 4*/
/*global require*/

require.config({
    paths: {
        "jasmine": ["/jasmine/jasmine"],
        "jasmine-html": ["/jasmine/jasmine-html"],
        "jasmine-boot": ["/jasmine/boot"],
        "main-spec": ["/spec/main.spec"],
        "main": ["/main"],
        "marked": ["/marked"]
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

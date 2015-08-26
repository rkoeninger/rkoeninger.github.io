'use strict';

/*jslint regexp: true, indent: 4*/
/*global require*/

var requirejs = require("./r.js");

global.define = requirejs.define;

requirejs.config({
    paths: {
        "jasmine": ["./jasmine/jasmine"],
        "jasmine-html": ["./jasmine/jasmine-html"],
        "jasmine-boot": ["./jasmine/boot"],
        "fake-spec": ["./spec/fake.spec"],
        "main-spec": ["./spec/main.spec"],
        "nonrequire-spec": ["./spec/nonrequire.spec"],
        "main": ["./main"],
        "marked": ["./marked"]
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

requirejs(["jasmine-boot"], function () {
    requirejs(["fake-spec", "main-spec", "nonrequire-spec"], function () {

    });
});
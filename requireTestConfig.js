'use strict';

/*jslint browser: true, regexp: true, indent: 4*/
/*global require*/

if (require) {
    console.log("require is available");
} else {
    console.log("require is NOT available");
}

if (require.config) {
    console.log("require.config is available");
} else {
    console.log("require.config is NOT available");
}

require.config({
    paths: {
        "jasmine": ["/jasmine/jasmine"],
        "jasmine-html": ["/jasmine/jasmine-html"],
        "jasmine-boot": ["/jasmine/boot"],
        "fake-spec": ["/spec/fake.spec"],
        "main-spec": ["/spec/main.spec"],
        "nonrequire-spec": ["/spec/nonrequire.spec"],
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
    require(["fake-spec", "main-spec", "nonrequire-spec"], function () {
        window.onload(); // Trigger jasmine
    });
});

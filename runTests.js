'use strict';

/*jslint indent: 4*/
/*global require, global*/

var requirejs = require('requirejs');
requirejs.config({
    nodeRequire: require,
    baseUrl: __dirname,
    paths: {
        "main": ["./main"]
    },
});

//make define available globally like it is in the browser
global.define = require("requirejs");

var jasmineRequire = require("./jasmine/jasmine");
global.jasmine = jasmineRequire.core(jasmineRequire);
var jasmineEnv = jasmine.getEnv();
var jasmineInterface = jasmineRequire.interface(jasmine, jasmineEnv);
//function extend(destination, source) {
//    for (var property in source) destination[property] = source[property];
//    return destination;
//}
//extend(global, jasmineInterface);

//make jasmine available globally like it is in the browser
global.describe = jasmineInterface.describe;
global.it = jasmineInterface.it;
global.expect = jasmineInterface.expect;

//var m = requirejs("./main");
//var ms = requirejs("./spec/main.spec");

//bring in and list all the tests to be run
requirejs(["./spec/fake.spec"], function (spec) {
    console.log("fake spec: ", spec);
    var ConsoleJasmineReporter2 = require("./consoleJasmineReporter2").ConsoleJasmineReporter;
    jasmineEnv.addReporter(new ConsoleJasmineReporter2());
    jasmineEnv.execute();
});

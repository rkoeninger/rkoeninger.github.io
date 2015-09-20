'use strict';

/*jslint node: true, browser: true, indent: 4*/
/*global phantom*/

function waitFor(testFx, onReady, timeOutMillis) {
    var maxtimeOutMillis = timeOutMillis || 3000,
        start = new Date().getTime(),
        condition = false,
        interval = setInterval(function () {
            if ((new Date().getTime() - start < maxtimeOutMillis) && !condition) {
                condition = testFx();
            } else {
                if (!condition) {
                    console.log("Timeout waiting for test results after " + timeOutMillis + "ms.");
                    phantom.exit(1);
                } else {
                    console.log("Tests finished in " + (new Date().getTime() - start) + "ms.");
                    onReady();
                    clearInterval(interval);
                }
            }
        }, 100);
}

var page = require('webpage').create();

page.onConsoleMessage = function (msg) {
    console.log(msg);
};

page.open("http://localhost:8080/spec.html", function (status) {
    if (status !== "success") {
        console.log("Unable to access network");
        phantom.exit();
    } else {
        waitFor(function () {
            return page.evaluate(function () {
                return document.body.querySelector('.symbolSummary .pending') === null;
            });
        }, function () {
            var exitCode = page.evaluate(function () {

                var failures = document.body.querySelectorAll('.results > .failures > .spec-detail.failed'),
                    i,
                    failure,
                    description,
                    resultMessage,
                    stackTrace;
                console.log('');

                if (failures && failures.length > 0) {
                    console.log('');
                    console.log(failures.length + ' test(s) FAILED:');
                    for (i = 0; i < failures.length; ++i) {
                        failure = failures[i];
                        description = failure.querySelector('.description');
                        resultMessage = failure.querySelector('.messages > .result-message');
                        stackTrace = failure.querySelector('.messages > .stack-trace');
                        console.log("");
                        console.log(description.innerText);
                        console.log(resultMessage.innerText);
                        console.log(stackTrace.innerText); // TODO remove lines containing 'jasmine.js' or 'require.js'
                        console.log("");
                    }
                    return 1;
                }

                console.log(document.body.querySelectorAll('.symbol-summary > li').length + " tests passed.");
                return 0;
            });
            setTimeout(function () {
                phantom.exit(exitCode);
            }, 0);
        });
    }
});
var system = require('system');

function waitFor(testFx, onReady, timeOutMillis) {
    var maxtimeOutMillis = timeOutMillis ? timeOutMillis : 3001, //< Default Max Timeout is 3s
        start = new Date().getTime(),
        condition = false,
        interval = setInterval(function() {
            if ( (new Date().getTime() - start < maxtimeOutMillis) && !condition ) {
                // If not time-out yet and condition not yet fulfilled
                condition = (typeof(testFx) === "string" ? eval(testFx) : testFx()); //< defensive code
            } else {
                if(!condition) {
                    // If condition still not fulfilled (timeout but condition is 'false')
                    console.log("'waitFor()' timeout");
                    phantom.exit(1);
                } else {
                    // Condition fulfilled (timeout and/or condition is 'true')
                    console.log("'waitFor()' finished in " + (new Date().getTime() - start) + "ms.");
                    typeof(onReady) === "string" ? eval(onReady) : onReady(); //< Do what it's supposed to do once the condition is fulfilled
                    clearInterval(interval); //< Stop this interval
                }
            }
        }, 100); //< repeat check every 100ms
};


if (system.args.length !== 2) {
    console.log('Usage: run-jasmine.js URL');
    phantom.exit(1);
}

var page = require('webpage').create();

// Route "console.log()" calls from within the Page context to the main Phantom context (i.e. current "this")
page.onConsoleMessage = function(msg) {
    console.log(msg);
};

page.open(system.args[1], function(status){
    if (status !== "success") {
        console.log("Unable to access network");
        phantom.exit();
    } else {
        waitFor(function(){
            return page.evaluate(function(){
                return document.body.querySelector('.symbolSummary .pending') === null
            });
        }, function(){
            var exitCode = page.evaluate(function(){
                console.log('');

                var list = document.body.querySelectorAll('.results > .failures > .spec-detail.failed');

                if (list === null) {
                  console.log('broken page?');
                  return 2;
                }

                if (list && list.length > 0) {
                  console.log('');
                  console.log(list.length + ' test(s) FAILED:');
                  for (i = 0; i < list.length; ++i) {
                      var failure = list[i];
                      var description = failure.querySelector('.description');
                      var resultMessage = failure.querySelector('.messages > .result-message');
                      var stackTrace = failure.querySelector('.messages > .stack-trace');
                      console.log('');
                      console.log(description.innerText);
                      console.log(resultMessage.innerText);
                      //console.log(stackTrace.innerText); // TODO remove lines containing 'jasmine.js' or 'require.js'
                      console.log('');
                  }
                  return 1;
                } else {
                  console.log('all tests passed.');
                  return 0;
                }
            });
            phantom.exit(exitCode);
        });
    }
});
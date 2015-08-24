'use strict';

/*jslint browser: true, regexp: true, indent: 4*/
/*global require*/

require.config({
    paths: {
        //jquery: 'libs/jquery/jquery',
        //underscore: 'libs/underscore/underscore',
        //backbone: 'libs/backbone/backbone'
    }
});

require(['main'], function (main) {
    main.init();
});

'use strict';

/*jslint indent: 4*/
/*global define, describe, it, expect*/

define(["main"], function (main) {
    describe("endsWith function", function () {
        it("endsWith(x + y, y) should always be true", function () {
            expect(main.endsWith("abc" + "xyz", "xyz")).toBe(true);
            expect(false).toBe(true);
        });
    });
});

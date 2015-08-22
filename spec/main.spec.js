'use strict';

/*jslint browser: true, indent: 4*/
/*global describe, it, expect*/
/*global endsWith*/

describe("endsWith function", function () {
    it("endsWith(x + y, y) should always be true", function () {
        expect(endsWith("abc" + "xyz", "xyz")).toBe(true);
    });
});

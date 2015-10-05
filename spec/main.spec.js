'use strict';

/*jslint indent: 4*/
/*global define, describe, it, expect*/

define(["main"], function (main) {
    describe("endsWith", function () {
        it("endsWith(x + y, y) should always be true", function () {
            expect(main.endsWith("abc" + "xyz", "xyz")).toBe(true);
        });
        it("should always be true when suffix is the empty string", function () {
            expect(main.endsWith("abc", "")).toBe(true);
            expect(main.endsWith("", "")).toBe(true);
        });
    });
    describe("contains", function () {
        it("should never be true when list is empty", function () {
            expect(main.contains([], "abc")).toBe(false);
            expect(main.contains([], "")).toBe(false);
            expect(main.contains([], null)).toBe(false);
        });
        it("should match anything that matches at least one item in the list", function () {
            expect(main.contains(["abc", "xyz"], "xyz")).toBe(true);
        });
        it("should match suffixes", function () {
            expect(main.contains(["abc", "xyz"], "tuvwxyz")).toBe(true);
        });
        it("should not match just any substring", function () {
            expect(main.contains(["abc", "xyz"], "asd_xyz_hds")).toBe(false);
        });
    });
    describe("getArticleFileName", function () {
        it("should return default article with extension for empty query string", function () {
            expect(main.getArticleFileName("")).toEqual("default.md");
        });
        it("should return default article with extension for query string with no args", function () {
            expect(main.getArticleFileName("?")).toEqual("default.md");
        });
        it("should return default article with extension for query string with no articleId arg", function () {
            expect(main.getArticleFileName("?abc=xyz&def=tuv")).toEqual("default.md");
        });
        it("should treat articleId with no value just like missing articleId arg", function () {
            expect(main.getArticleFileName("?articleId=")).toEqual("default.md");
        });
        it("should find articleId no matter where it is in query string", function () {
            expect(main.getArticleFileName("?articleId=abc.md")).toEqual("abc.md");
            expect(main.getArticleFileName("?abc=xyz&articleId=abc.md")).toEqual("abc.md");
            expect(main.getArticleFileName("?articleId=abc.md&def=tuv")).toEqual("abc.md");
            expect(main.getArticleFileName("?abc=xyz&articleId=abc.md&def=tuv")).toEqual("abc.md");
        });
        it("should add .md file extension whether it is present in the query string or not", function () {
            expect(main.getArticleFileName("?articleId=abc.md")).toEqual("abc.md");
            expect(main.getArticleFileName("?articleId=abc")).toEqual("abc.md");
        });
    });
});

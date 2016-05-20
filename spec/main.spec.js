'use strict';

/*jslint indent: 2*/
/*global define, describe, it, expect*/

define(["main"], main => {
  describe("endsWith", () => {
    it("endsWith(x + y, y) should always be true", () => {
      expect(main.endsWith("abc" + "xyz", "xyz")).toBe(true);
    });
    it("should always be true when suffix is the empty string", () => {
      expect(main.endsWith("abc", "")).toBe(true);
      expect(main.endsWith("", "")).toBe(true);
    });
  });
  describe("contains", () => {
    it("should never be true when list is empty", () => {
      expect(main.contains([], "abc")).toBe(false);
      expect(main.contains([], "")).toBe(false);
      expect(main.contains([], null)).toBe(false);
    });
    it("should match anything that matches at least one item in the list", () => {
      expect(main.contains(["abc", "xyz"], "xyz")).toBe(true);
    });
    it("should match suffixes", () => {
      expect(main.contains(["abc", "xyz"], "tuvwxyz")).toBe(true);
    });
    it("should not match just any substring", () => {
      expect(main.contains(["abc", "xyz"], "asd_xyz_hds")).toBe(false);
    });
  });
  describe("getArticleFileName", () => {
    it("should return default article with extension for empty query string", () => {
      expect(main.getArticleFileName("")).toEqual("default.html");
    });
    it("should return default article with extension for query string with no args", () => {
      expect(main.getArticleFileName("?")).toEqual("default.html");
    });
    it("should return default article with extension for query string with no articleId arg", () => {
      expect(main.getArticleFileName("?abc=xyz&def=tuv")).toEqual("default.html");
    });
    it("should treat articleId with no value just like missing articleId arg", () => {
      expect(main.getArticleFileName("?articleId=")).toEqual("default.html");
    });
    it("should find articleId no matter where it is in query string", () => {
      expect(main.getArticleFileName("?articleId=abc.md")).toEqual("abc.md");
      expect(main.getArticleFileName("?abc=xyz&articleId=abc.md")).toEqual("abc.md");
      expect(main.getArticleFileName("?articleId=abc.md&def=tuv")).toEqual("abc.md");
      expect(main.getArticleFileName("?abc=xyz&articleId=abc.md&def=tuv")).toEqual("abc.md");
    });
    it("should treat single a single query string arg with no '=value' as the articleId", () => {
      expect(main.getArticleFileName("?whatever.html")).toEqual("whatever.html");
    });
    it("should add the .html extension if no other file extension", () => {
      expect(main.getArticleFileName("?articleId=whatever")).toEqual("whatever.html");
      expect(main.getArticleFileName("?whatever")).toEqual("whatever.html");
    });
    it("should not add the .html extension if articleId has some other extension", () => {
      expect(main.getArticleFileName("?articleId=abc.md")).toEqual("abc.md");
    });
  });
});

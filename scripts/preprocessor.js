'use strict';

/*jslint browser: true, regexp: true, nomen: true, unparam: true, indent: 2*/
/*global define*/

define(["marked", "jquery", "lodash"], function (marked, $, _) {
  var splitRegex = /\r?\n/,
    trivialCodeRegex = /[a-zA-Z0-9_]+/,
    langs = [{
      tag: "HTML5",
      name: "HTML",
      class: "html"
    }, {
      tag: "CSHARP",
      name: "C#",
      class: "csharp"
    }, {
      tag: "FSHARP",
      name: "F#",
      class: "fsharp"
    }, {
      tag: "PYTHON",
      name: "Python",
      class: "python"
    }, {
      tag: "RUBY",
      name: "Ruby",
      class: "ruby"
    }, {
      tag: "HASKELL",
      name: "Haskell",
      class: "haskell"
    }, {
      tag: "JAVA",
      name: "Java",
      class: "java"
    }, {
      tag: "SCALA",
      name: "Scala",
      class: "scala"
    }, {
      tag: "DOS",
      name: "Windows Batch",
      class: "dos"
    }];

  function getDisplayType(element) {
    var cStyle = element.currentStyle || window.getComputedStyle(element, "");
    return cStyle.display;
  }

  function isInlineElement(element) {
    return getDisplayType(element.parentElement) === "inline"
      || element.parentElement.nodeName === "P";
  }

  function newClearFix() {
    var fix = document.createElement("div");
    fix.style.clear = "both";
    return fix;
  }

  function newText(text) {
    return document.createTextNode(text);
  }

  function newElement(name, children, classes, attributes) {
    var element = document.createElement(name);
    _.forEach(children, function (x) { return element.appendChild(x); });
    _.forEach(classes, function (x) { return element.classList.add(x); });
    _.forEach(attributes, function (v, k) { return element.setAttribute(k, v); });
    return element;
  }

  function codeHandler(lang, name, xml) {
    var text = _.trim(xml.innerHTML),
      codeElement = newElement("code", [newText(text)], ["lang-" + lang]),
      preElement = newElement("pre", [codeElement]),
      langIcon = newElement("img", [], ["lang-icon"], {
        "src": "/logos/" + lang + ".svg",
        "title": name,
        "alt": name
      }),
      fileName = newElement("span", [newText(xml.attributes.filename ? xml.attributes.filename.value : "")], ["file-name"]),
      lines = text.split(splitRegex),
      loc = lines.filter(function (x) { return trivialCodeRegex.test(x); }).length,
      stats = newElement("span", [newText(loc + " LOC")], ["stats"]),
      titleBar = newElement(
        "div",
        xml.attributes.filename
          ? [langIcon, fileName, stats, newClearFix()]
          : [langIcon, stats, newClearFix()],
        ["title-bar"]
      );
    return newElement("div", [titleBar, preElement], ["snippet"]);
  }

  function processHtml(xml) {
    var attrs, renderedHtmlString, parsedHtml, lang, div;
    if (xml.nodeType === document.TEXT_NODE) {
      return xml;
    }
    if (xml.nodeName === "MARKDOWN") {
      renderedHtmlString = marked(xml.innerHTML);
      parsedHtml = $.parseHTML(renderedHtmlString);
      return newElement(isInlineElement(xml) ? "span" : "div", _.map(parsedHtml, processHtml));
    }
    if (xml.nodeName === "NOMOBILE") {
      return newElement(isInlineElement(xml) ? "span" : "div", _.map(xml.childNodes, processHtml), ["no-mobile"]);
    }
    if (xml.nodeName === "ONLYMOBILE") {
      return newElement(isInlineElement(xml) ? "span" : "div", _.map(xml.childNodes, processHtml), ["only-mobile"]);
    }
    if (xml.nodeName === "C") {
      return newElement("code", _.map(xml.childNodes, processHtml));
    }
    lang = _.find(langs, function (x) { return x.tag === xml.nodeName; });
    if (lang) {
      return codeHandler(lang.class, lang.name, xml);
    }
    if (xml.nodeName === "ICONSET") {
      div = newElement("div", _.map(xml.children, function (item) {
        var name = item.attributes.name.value;
        return newElement("a", [newElement("img", [], ["detail"], {
          "src": item.attributes.icon.value,
          "title": name,
          "alt": name
        })], [], {
          "href": item.attributes.externalUrl.value
        });
      }), ["icon-set"]);
      return newElement("div", [div, newClearFix()]);
    }
    if (xml.nodeName === "TOC") {
      return newElement("ul", _.map(xml.children, function (item) {
        var a = newElement("a", [document.createTextNode(item.textContent)], [], {
          "href": "/?" + item.attributes.url.value
        });
        return newElement("li", [a]);
      }));
    }
    if (xml.nodeType === document.ELEMENT_NODE) {
      attrs = _.reduce(xml.attributes, function (acc, attr) { acc[attr.name] = attr.value; return acc; }, {});
      return newElement(xml.nodeName, _.map(xml.childNodes, processHtml), [], attrs);
    }
    return xml;
  }

  function processHtmlContent(articleContent) {
    var articleXml = $.parseHTML("<div>" + articleContent + "</div>"),
      html = processHtml(articleXml[0]);
    return html.innerHTML;
  }

  return {
    processHtmlContent: processHtmlContent
  };
});

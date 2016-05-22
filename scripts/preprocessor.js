'use strict';

/*jslint browser: true, regexp: true, nomen: true, unparam: true, indent: 2*/
/*global define*/

define(["marked", "jquery", "lodash"], function (marked, $, _) {
  var splitRegex = /\r?\n/,
    trivialCodeRegex = /[a-zA-Z0-9_]+/;

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
    var text = _.trim(xml.textContent),
      codeElement = newElement("code", [newText(text)], ["lang-" + lang]),
      preElement = newElement("pre", [codeElement]),
      langIcon = newElement("img", [], ["lang-icon"], {
        "src": "/logos/" + lang + ".svg",
        "title": name,
        "alt": name
      }),
      fileName = newElement("span", [newText(xml.attributes.filename ? xml.attributes.filename.value : "")], ["file-name"]),
      lines = text.split(splitRegex),
      loc = lines.length,
      sloc = lines.filter(function (x) { return trivialCodeRegex.test(x); }).length,
      statsText = loc === sloc ? loc + " LOC" : loc + " LOC (" + sloc + " SLOC)",
      stats = newElement("span", [newText(statsText)], ["stats"]),
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
    var attrs, renderedHtmlString, parsedHtml;
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
    if (xml.nodeName === "HTML5") {
      return codeHandler("html", "HTML", xml);
    }
    if (xml.nodeName === "CSHARP") {
      return codeHandler("csharp", "C#", xml);
    }
    if (xml.nodeName === "FSHARP") {
      return codeHandler("fsharp", "F#", xml);
    }
    if (xml.nodeName === "PYTHON") {
      return codeHandler("python", "Python", xml);
    }
    if (xml.nodeName === "HASKELL") {
      return codeHandler("haskell", "Haskell", xml);
    }
    if (xml.nodeName === "JAVA") {
      return codeHandler("java", "Java", xml);
    }
    if (xml.nodeName === "SCALA") {
      return codeHandler("scala", "Scala", xml);
    }
    if (xml.nodeName === "DOS") {
      return codeHandler("dos", "Windows Batch", xml);
    }
    if (xml.nodeName === "RUBY") {
      return codeHandler("ruby", "Ruby", xml);
    }
    if (xml.nodeName === "ICONSET") {
      var div = newElement("div", _.map(xml.children, function (item) {
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

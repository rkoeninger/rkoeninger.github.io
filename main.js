'use strict';

/*jslint browser: true, regexp: true, nomen: true, indent: 2*/
/*global define, MathJax*/

define(["marked", "jquery", "mathjax", "hljs", "lodash"], (marked, $, ignore, hljs, _) => {
  var main = (() => {
    var defaultArticle = "default.html",
      defaultExt = ".html",
      disqusEnabled = false,
      disqusExcludedArticles = ["/default.html", "/status.html", "/htmlTest.html"],
      disqusScriptUrl = "//rkoeningergithubio.disqus.com/embed.js",
      historyUrlBase = "//github.com/rkoeninger/rkoeninger.github.io/commits/master/articles/",
      commitsUrlBase = "//api.github.com/repos/rkoeninger/rkoeninger.github.io/commits?path=",
      sourceUrlBase = "//cdn.rawgit.com/rkoeninger/rkoeninger.github.io/master/articles/",
      rawMarkdowns = {},
      modifiedDates = {},
      splitRegex = /\r?\n/,
      trivialCodeRegex = /[a-zA-Z0-9_]+/,
      plusGlobalRegex = /\+/g;

    function getQsValue(queryString, key) {
      var qsParts, argVal;

      if (queryString.length === 0) {
        return "";
      }

      qsParts = queryString.substr(1).split("&");

      if (!(qsParts || key)) {
        return "";
      }

      argVal = _.find(qsParts, qsPart => {
        var argValSplit = qsPart.split("=");
        return argValSplit.length === 2 && argValSplit[0] === key;
      });

      if (argVal) {
        return decodeURIComponent(argVal.split("=")[1].replace(plusGlobalRegex, " "));
      }

      return "";
    }

    function wholeQs(s) {
      return s.length < 2 || s[0] !== "?" || s.indexOf("&") !== -1 || s.indexOf("=") !== -1
        ? null
        : s.substring(1);
    }

    function endsWith(str, suffix) {
      return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }

    function contains(list, target) {
      return _.some(list, item => endsWith(target, item));
    }

    function defaultExtension(articleName) {
      return articleName.indexOf(".") > 0 ? articleName : articleName + defaultExt;
    }

    function getArticleFileName(queryString) {
      return defaultExtension(getQsValue(queryString, "articleId")
        || wholeQs(queryString)
        || defaultArticle);
    }

    function getArticleUrl(articleFile) {
      return "/articles/" + articleFile;
    }

    function getCommitHistoryUrl(articleUrl) {
      return commitsUrlBase + articleUrl;
    }

    function getPageTitle(articleHtml) {
      return $(_.find($(articleHtml), x => $(x).is("h1"))).text() || "Fear of a Blue Screen";
    }

    function parseArticleId(url) {
      var parser = document.createElement("a");
      parser.href = url;
      return defaultExtension(getArticleFileName(parser.search));
    }

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
      _.forEach(children, x => element.appendChild(x));
      _.forEach(classes, x => element.classList.add(x));
      _.forEach(attributes, (v, k) => element.setAttribute(k, v));
      return element;
    }

    function codeHandler(lang, name, xml) {
      var text = _.trim(xml.textContent);
      var codeElement = newElement("code", [newText(text)], ["lang-" + lang]);
      var preElement = newElement("pre", [codeElement]);
      var langIcon = newElement("img", [], ["lang-icon"], {
        "src": "/logos/" + lang + ".svg",
        "title": name,
        "alt": name
      });
      var fileName = newElement("span", [newText(xml.attributes.filename ? xml.attributes.filename.value : "")], ["file-name"]);
      var lines = text.split(splitRegex);
      var loc = lines.length;
      var sloc = lines.filter(x => trivialCodeRegex.test(x)).length;
      var statsText = loc === sloc ? loc + " LOC" : loc + " LOC (" + sloc + " SLOC)";
      var stats = newElement("span", [newText(statsText)], ["stats"]);
      var titleBar = newElement(
        "div",
        xml.attributes.filename
          ? [langIcon, fileName, stats, newClearFix()]
          : [langIcon, stats, newClearFix()],
        ["title-bar"]);
      return newElement("div", [titleBar, preElement], ["snippet"]);
    }

    function processXml(xml) {
      if (xml.nodeType === xml.TEXT_NODE) {
        return xml;
      } else if (xml.nodeName === "NOMOBILE") {
        var div = newElement(isInlineElement(xml) ? "span" : "div", xml.childNodes);
        div.classList.add("no-mobile");
        return div;
      } else if (xml.nodeName === "ONLYMOBILE") {
        var div = newElement(isInlineElement(xml) ? "span" : "div", xml.childNodes);
        div.classList.add("only-mobile");
        return div;
      } else if (xml.nodeName === "C") {
        return newElement("code", _.map(xml.childNodes, processXml));
      } else if (xml.nodeName === "HTML5") {
        return codeHandler("html", "HTML", xml);
      } else if (xml.nodeName === "CSHARP") {
        return codeHandler("csharp", "C#", xml);
      } else if (xml.nodeName === "HASKELL") {
        return codeHandler("haskell", "Haskell", xml);
      } else if (xml.nodeName === "JAVA") {
        return codeHandler("java", "Java", xml);
      } else if (xml.nodeName === "SCALA") {
        return codeHandler("scala", "Scala", xml);
      } else if (xml.nodeName === "DOS") {
        return codeHandler("dos", "Windows Batch", xml);
      } else if (xml.nodeName === "RUBY") {
        return codeHandler("ruby", "Ruby", xml);
      } else if (xml.nodeName === "ICONSET") {
        return newElement("div", _.map(xml.children, item => {
          var name = item.attributes.name.value;
          var a = newElement("a", [newElement("img", [], ["detail"], {
            "src": item.attributes.icon.value,
            "title": name,
            "alt": name
          })]);
          a.setAttribute("href", item.attributes.externalUrl.value);
          return a;
        }), ["icon-set"]);
        // TODO: add a clearfix after this
      } else if (xml.nodeName === "TOC") {
        return newElement("ul", _.map(xml.children, item => {
          var a = newElement("a", [document.createTextNode(item.textContent)]);
          a.setAttribute("href", "/?" + item.attributes.url.value);
          return newElement("li", [a]);
        }));
      } else {
        var attrs = _.reduce(xml.attributes, (acc, attr) => { acc[attr.name] = attr.value; return acc; }, {});
        return newElement(xml.nodeName, _.map(xml.childNodes, processXml), [], attrs);
      }
    }

    function processXmlContent(articleContent) {
      var articleXml = $.parseHTML("<div>" + articleContent + "</div>");
      var html = processXml(articleXml[0]);
      return html.innerHTML;
    }

    function populateArticle(articleDiv, articleFile, articleMarkdown) {
      var articleHtml = endsWith(articleFile, ".html") ? processXmlContent(articleMarkdown) : marked(articleMarkdown);
      articleDiv.html(articleHtml);
      document.title = getPageTitle(articleHtml);

      // Wrap tables in surrounding div
      $("table").wrap("<div class=\"table-wrapper\"></div>");

      // Navigate within the site using PushState
      $("a").each(a => {
        if (a.host === window.location.host) {
          $(a).click(e => {
            if (e.which !== 1) {
              return true;
            }

            var url = $(a).attr("href"),
              articleId = parseArticleId(url);
            history.pushState({articleId: articleId}, "", url);
            loadArticle(articleId);
            $("html, body").animate({ scrollTop: 0 }, "fast");
            return false;
          });
        }
      });

      // Polymer introduces a delay in the rendering of the page
      setTimeout(() => {
        hljs.initHighlighting.called = false;
        hljs.initHighlighting();

        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
      }, 200);
    }

    function populateLastModifiedLabel(author, date) {
      $("#last-modified").text("Last modified by " + author + " on " + date);
    }

    function loadArticle(articleFile) {
      var articleUrl = getArticleUrl(articleFile),
        articleDiv = $("#main-article"),
        modifiedDate = modifiedDates[articleFile],
        rawMarkdown = rawMarkdowns[articleFile];

      $("#source-link").attr("href", sourceUrlBase + articleFile);
      $("#history-link").attr("href", historyUrlBase + articleFile);

      if (contains(disqusExcludedArticles, articleUrl)) {
        $("#disqus_thread, #disqus_script").remove();
      } else if (disqusEnabled && window.matchMedia("screen and (min-width: 1000px)").matches) {
        $("main").append($("<div />", {id: "disqus_thread", class: "disqus_thread"}));
        $("main").append($("<script />", {id: "disqus_script", src: disqusScriptUrl}));
      }

      if (rawMarkdown) {
        populateArticle(articleDiv, articleFile, rawMarkdown);
      } else {
        $.ajax({
          type: "GET",
          dataType: "text",
          url: articleUrl,
          success: articleMarkdown => {
            rawMarkdowns[articleFile] = articleMarkdown;
            populateArticle(articleDiv, articleFile, articleMarkdown);
          },
          error: (ignore, textStatus, errorThrown) => {
            articleDiv.html("failed to load article content<br />" + textStatus + "<br />" + errorThrown);
          }
        });
      }

      if (modifiedDate) {
        populateLastModifiedLabel(modifiedDate.author, modifiedDate.date);
      } else {
        $.getJSON(
          getCommitHistoryUrl(articleUrl),
          data => {
            var author, date;

            if (data.length > 0) {
              author = data[0].commit.author.name;
              date = new Date(data[0].commit.author.date).toLocaleDateString();
              modifiedDates[articleFile] = { author: author, date: date };
              populateLastModifiedLabel(author, date);
            }
          }
        );
      }
    }

    function init() {
      $(window).on("popstate", event => {
        var articleId = event.originalEvent.state
          ? event.originalEvent.state.articleId
          : defaultArticle;
        loadArticle(articleId);
      });

      loadArticle(getArticleFileName(window.location.search));
    }

    return {
      getQsValue: getQsValue,
      endsWith: endsWith,
      contains: contains,
      getArticleFileName: getArticleFileName,
      getArticleUrl: getArticleUrl,
      getCommitHistoryUrl: getCommitHistoryUrl,
      getPageTitle: getPageTitle,
      init: init
    };
  })();

  return main;
});

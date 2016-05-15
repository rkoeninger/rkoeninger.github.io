'use strict';

/*jslint browser: true, regexp: true, nomen: true, indent: 2*/
/*global define, MathJax*/

define(["marked", "jquery", "mathjax", "hljs", "lodash"], function (marked, $, ignore, hljs, _) {
  var main = (function () {
    var defaultArticle = "default.md",
      disqusExcludedArticles = ["/default.md", "/status.md", "/xmlTest.xml"],
      historyUrlBase = "//github.com/rkoeninger/rkoeninger.github.io/commits/master/articles/",
      commitsUrlBase = "//api.github.com/repos/rkoeninger/rkoeninger.github.io/commits?path=",
      sourceUrlBase = "//cdn.rawgit.com/rkoeninger/rkoeninger.github.io/master/articles/",
      disqusScriptUrl = "//rkoeningergithubio.disqus.com/embed.js",
      rawMarkdowns = {},
      modifiedDates = {};

    function getQsValue(queryString, key) {
      var qsParts, argVal;

      if (queryString.length === 0) {
        return "";
      }

      qsParts = queryString.substr(1).split("&");

      if (!(qsParts || key)) {
        return "";
      }

      argVal = _.find(qsParts, function (qsPart) {
        var argValSplit = qsPart.split("=");
        return argValSplit.length === 2 && argValSplit[0] === key;
      });

      if (argVal) {
        return decodeURIComponent(argVal.split("=")[1].replace(/\+/g, " "));
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
      return _.some(list, function (item) {
        return endsWith(target, item);
      });
    }

    function defaultExtension(articleName) {
      return articleName.indexOf(".") > 0 ? articleName : articleName + ".md";
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
      return $(_.find($(articleHtml), function (x) { return $(x).is("h1"); })).text() || "Fear of a Blue Screen";
    }

    function parseArticleId(url) {
      var parser = document.createElement("a");
      parser.href = url;
      return defaultExtension(getArticleFileName(parser.search));
    }

    function newElement(name, children) {
      var element = document.createElement(name);
      _.forEach(children, function (child) {
        element.appendChild(child);
      });
      return element;
    }

    function processXml(xml) {
      if (xml.nodeType === xml.TEXT_NODE) {
        return xml;
      } else if (xml.nodeName === "c") {
        return newElement("code", _.map(xml.childNodes, processXml));
      } else if (xml.nodeName === "csharp") {
        var codeElement = newElement("code", xml.childNodes);
        var preElement = newElement("pre", [codeElement]);
        codeElement.classList.add("lang-csharp");
        return preElement;
      } else if (xml.nodeName === "toc") {
        return newElement("ul", _.map(xml.children, function (item) {
          var a = newElement("a", [document.createTextNode(item.textContent)]);
          a.setAttribute("href", "/?" + item.attributes.url.value);
          return newElement("li", [a]);
        }));
      } else {
        return newElement(xml.nodeName, _.map(xml.childNodes, processXml));
      }
    }

    function processXmlContent(articleContent) {
      var articleXml = $.parseXML("<div>" + articleContent.replace("&", "&amp;") + "</div>");
      var html = processXml(articleXml.firstElementChild);
      return html.innerHTML;
    }

    function populateArticle(articleDiv, articleFile, articleMarkdown) {
      var articleHtml = endsWith(articleFile, ".xml") ? processXmlContent(articleMarkdown) : marked(articleMarkdown);
      articleDiv.html(articleHtml);
      document.title = getPageTitle(articleHtml);

      // Hide missing images
      $("img").error(function () { 
        $(this).hide();
      });

      // Wrap tables in surrounding div
      $("table").wrap("<div class=\"table-wrapper\"></div>");

      // Navigate within the site using PushState
      $("a").each(function () {
        if (this.host === window.location.host) {
          $(this).click(function (e) {
            if (e.which !== 1) {
              return true;
            }

            var url = $(this).attr("href"),
              articleId = parseArticleId(url);
            history.pushState({articleId: articleId}, "", url);
            loadArticle(articleId);
            $("html, body").animate({ scrollTop: 0 }, "fast");
            return false;
          });
        }
      });

      // Polymer introduces a delay in the rendering of the page
      setTimeout(function () {
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
      } else if (window.matchMedia("screen and (min-width: 1000px)").matches) {
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
          success: function (articleMarkdown) {
            rawMarkdowns[articleFile] = articleMarkdown;
            populateArticle(articleDiv, articleFile, articleMarkdown);
          },
          error: function (ignore, textStatus, errorThrown) {
            articleDiv.html("failed to load article content<br />" + textStatus + "<br />" + errorThrown);
          }
        });
      }

      if (modifiedDate) {
        populateLastModifiedLabel(modifiedDate.author, modifiedDate.date);
      } else {
        $.getJSON(
          getCommitHistoryUrl(articleUrl),
          function (data) {
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
      $(window).on("popstate", function (event) {
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
  }());

  return main;
});

'use strict';

/*jslint browser: true, regexp: true, nomen: true, unparam: true, indent: 2*/
/*global define, MathJax*/

define(["jquery", "mathjax", "hljs", "lodash", "preprocessor", "cache", "queryString"], function ($, ignore, hljs, _, preprocessor, cache, queryString) {
  var main = (function () {
    var defaultArticle = "default.html",
      defaultExt = ".html",
      defaultPageTitle = "Fear of a Blue Screen",
      disqusEnabled = false,
      disqusExcludedArticles = ["/default.html", "/status.html", "/htmlTest.html"],
      disqusScriptUrl = "//rkoeningergithubio.disqus.com/embed.js",
      historyUrlBase = "//github.com/rkoeninger/rkoeninger.github.io/commits/master/articles/",
      commitsUrlBase = "//api.github.com/repos/rkoeninger/rkoeninger.github.io/commits?path=",
      sourceUrlBase = "//cdn.rawgit.com/rkoeninger/rkoeninger.github.io/master/articles/";

    function contains(list, target) {
      return _.some(list, function (item) { return _.endsWith(target, item); });
    }

    function defaultExtension(articleName) {
      return articleName.indexOf(".") > 0 ? articleName : articleName + defaultExt;
    }

    function getArticleFileName(qs) {
      return defaultExtension(queryString.get(qs, "articleId")
        || queryString.all(qs)
        || defaultArticle);
    }

    function getPageTitle(articleHtml) {
      return $(_.find($(articleHtml), function (x) { return $(x).is("h1"); })).text() || defaultPageTitle;
    }

    function parseArticleId(url) {
      return defaultExtension(getArticleFileName(queryString.fromUrl(url)));
    }

    function populateArticle(articleDiv, content) {
      var articleHtml = preprocessor.processHtmlContent(content);
      articleDiv.html(articleHtml);
      document.title = getPageTitle(articleHtml);

      // Wrap tables in surrounding div
      $("table").wrap("<div class=\"table-wrapper\"></div>");

      // Navigate within the site using PushState
      $("a").each(function (i, a) {
        if (a.host === window.location.host) {
          $(a).click(function (e) {
            if (e.which !== 1) {
              return true;
            }

            var url = $(a).attr("href"),
              articleId = parseArticleId(url);
            history.pushState({articleId: articleId}, "", url);
            loadArticle(articleId);
            $("html, body").animate({scrollTop: 0}, "fast");
            return false;
          });
        }
      });

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
      var articleUrl = "/articles/" + articleFile,
        articleDiv = $("#main-article");

      $("#source-link").attr("href", sourceUrlBase + articleFile);
      $("#history-link").attr("href", historyUrlBase + articleFile);

      if (contains(disqusExcludedArticles, articleUrl)) {
        $("#disqus_thread, #disqus_script").remove();
      } else if (disqusEnabled && window.matchMedia("screen and (min-width: 1000px)").matches) {
        $("main").append($("<div />", {id: "disqus_thread", class: "disqus_thread"}));
        $("main").append($("<script />", {id: "disqus_script", src: disqusScriptUrl}));
      }

      cache.loadText(
        articleUrl,
        function (content) { populateArticle(articleDiv, content); },
        function (message) { articleDiv.html("failed to load article content<br />" + message); }
      );

      cache.loadJSON(
        commitsUrlBase + articleUrl,
        function (data) {
          var author = data[0].commit.author.name,
            date = new Date(data[0].commit.author.date).toLocaleDateString();
          populateLastModifiedLabel(author, date);
        }
      );
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
      contains: contains,
      getArticleFileName: getArticleFileName,
      getPageTitle: getPageTitle,
      init: init
    };
  }());

  return main;
});

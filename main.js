'use strict';

/*jslint browser: true, regexp: true, indent: 4*/
/*global define, MathJax*/

define(["marked", "jquery", "mathjax", "hljs"], function (marked, $, ignore, hljs) {
    var main = (function () {
        var defaultArticle = "default.md",
            disqusExcludedArticles = ["/default.md", "/status.md"],
            historyUrlBase = "//github.com/rkoeninger/rkoeninger.github.io/commits/master/articles/",
            commitsUrlBase = "//api.github.com/repos/rkoeninger/rkoeninger.github.io/commits?path=",
            disqusScriptUrl = "//rkoeningergithubio.disqus.com/embed.js",
            rawMarkdowns = {},
            modifiedDates = {};

        function getQsValue(queryString, key) {
            var qsParts, argAndVal, i;

            if (queryString.length === 0) {
                return "";
            }

            qsParts = queryString.substr(1).split("&");

            if (!(qsParts || key)) {
                return "";
            }

            for (i = 0; i < qsParts.length; i++) {
                argAndVal = qsParts[i].split("=");

                if (argAndVal.length === 2 && argAndVal[0] === key) {
                    return decodeURIComponent(argAndVal[1].replace(/\+/g, " "));
                }
            }

            return "";
        }

        function wholeQs(s) {
            return s.length < 2 || s[0] !== "?" || s.indexOf("&") !== -1
                ? null
                : s.substring(1);
        }

        function endsWith(str, suffix) {
            return str.indexOf(suffix, str.length - suffix.length) !== -1;
        }

        function contains(list, item) {
            var i;
            for (i = 0; i < list.length; i++) {
                if (endsWith(item, list[i])) {
                    return true;
                }
            }

            return false;
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

        function getPageTitle(articleMarkdown) {
            // find (#) elements in markdown
            var titleMatches = articleMarkdown.match(/\x23\x20(.*)\x0D?\x0A/);

            if (titleMatches) {
                // strip markdown formatting from (#) element and make it the title
                return $(marked(titleMatches[1]))[0].textContent;
            }

            return "Fear of a Blue Screen";
        }

        function parseArticleId(url) {
            var parser = document.createElement("a");
            parser.href = url;
            return defaultExtension(getArticleFileName(parser.search));
        }

        function popuplateArticle(articleDiv, articleMarkdown) {
            articleDiv.html(marked(articleMarkdown));
            document.title = getPageTitle(articleMarkdown);

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
                        return false;
                    });
                }
            });

            hljs.initHighlighting.called = false;
            hljs.initHighlighting();

            MathJax.Hub.Queue(["Typeset", MathJax.Hub]);

            $("html, body").animate({ scrollTop: 0 }, "fast");
        }

        function populateLastModifiedLabel(author, date) {
            $("#last-modified").text("Last modified by " + author + " on " + date);
        }

        function loadArticle(articleFile) {
            var articleUrl = getArticleUrl(articleFile),
                articleDiv = $("#main-article"),
                modifiedDate = modifiedDates[articleFile],
                rawMarkdown = rawMarkdowns[articleFile];

            $("#source-link").attr("href", articleUrl);
            $("#history-link").attr("href", historyUrlBase + articleFile);

            if (contains(disqusExcludedArticles, articleUrl)) {
                $("#disqus_thread, #disqus_script").remove();
            } else if (window.matchMedia("screen and (min-width: 1000px)").matches) {
                $("main").append($("<div />", {id: "disqus_thread", class: "disqus_thread"}));
                $("main").append($("<script />", {id: "disqus_script", src: disqusScriptUrl}));
            }

            if (rawMarkdown) {
                popuplateArticle(articleDiv, rawMarkdown);
            } else {
                $.ajax({
                    type: "GET",
                    dataType: "text",
                    url: articleUrl,
                    success: function (articleMarkdown) {
                        rawMarkdowns[articleFile] = articleMarkdown;
                        popuplateArticle(articleDiv, articleMarkdown);
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

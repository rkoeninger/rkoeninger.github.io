'use strict';

/*jslint browser: true, regexp: true, indent: 4*/
/*global define, hljs*/

define(["marked", "jquery", "mathjax", "hljs"], function (marked, $, ignore, hljs) {
    var main = (function () {
        var defaultArticle = "underConstruction";
        var disqusExcludedArticles = ["/default.md", "/underConstruction.md"];
        var historyUrlBase = "//github.com/rkoeninger/rkoeninger.github.io/commits/master/articles/";
        var commitsUrlBase = "//api.github.com/repos/rkoeninger/rkoeninger.github.io/commits?path=";

        function getQsValue(queryString, key) {
            var qsParts, argAndVal, i;

            if (queryString.length === 0) {
                return "";
            }

            qsParts = queryString.substr(1).split("&");

            if (!(qsParts || key)) {
                return "";
            }

            for (i = 0; i < qsParts.length; ++i) {
                argAndVal = qsParts[i].split("=");

                if (argAndVal.length === 2 && argAndVal[0] === key) {
                    return decodeURIComponent(argAndVal[1].replace(/\+/g, " "));
                }
            }

            return "";
        }

        function endsWith(str, suffix) {
            return str.indexOf(suffix, str.length - suffix.length) !== -1;
        }

        function contains(list, item) {
            var i;
            for (i = 0; i < list.length; ++i) {
                if (endsWith(item, list[i])) {
                    return true;
                }
            }

            return false;
        }

        function getArticleFileName(queryString) {
            var articleId = getQsValue(queryString, "articleId");

            if (!articleId) {
                articleId = defaultArticle;
            }

            if (!endsWith(articleId, ".md")) {
                articleId += ".md";
            }

            return articleId;
        }

        function getArticleUrl(articleFile) {
            return "/articles/" + articleFile;
        }

        function getCommitHistoryUrl(articleUrl) {
            return commitsUrlBase + articleUrl;
        }

        function init() {
            var queryString, articleFile, articleUrl, articleDiv, disqusDiv;

            queryString = window.location.search;
            articleDiv = $("#article0");
            disqusDiv = $("#disqus_thread");

            articleFile = getArticleFileName(queryString);
            articleUrl = getArticleUrl(articleFile);
            $("#source-link").attr("href", articleUrl);
            $("#history-link").attr("href", historyUrlBase + articleFile);

            $.ajax({
                type: "GET",
                dataType: "text",
                url: articleUrl,
                success: function (articleMarkdown) {
                    var titleMatches;

                    articleDiv.html(marked(articleMarkdown));

                    if (contains(disqusExcludedArticles, articleUrl)) {
                        disqusDiv.hide();
                    }

                    // find (#) elements in markdown
                    titleMatches = articleMarkdown.match(/\x23\x20(.*)\x0D?\x0A/);

                    if (titleMatches) {
                        // strip markdown formatting from (#) element and make it the title
                        document.title = $(marked(titleMatches[1]))[0].textContent;
                    }

                    hljs.initHighlighting();
                },
                error: function (ignore, textStatus, errorThrown) {
                    articleDiv.html("failed to load article content<br />" + textStatus + "<br />" + errorThrown);
                }
            });

            $.getJSON(
                getCommitHistoryUrl(articleUrl),
                function (data) {
                    var author, date;

                    if (data.length > 0) {
                        author = data[0].commit.author.name;
                        date = new Date(data[0].commit.author.date).toLocaleDateString();
                        $("#last-modified").text("Last modified by " + author + " on " + date);
                    }
                }
            );
        }

        return {
            getQsValue: getQsValue,
            endsWith: endsWith,
            contains: contains,
            getArticleFileName: getArticleFileName,
            getArticleUrl: getArticleUrl,
            getCommitHistoryUrl: getCommitHistoryUrl,
            init: init
        };
    })();

    return main;
});

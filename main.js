'use strict';

/*jslint browser: true, regexp: true, indent: 4*/
/*global define, hljs*/

define(["marked", "jquery", "mathjax", "hljs"], function (marked, $, ignore, hljs) {
    var main = (function () {
        var defaultArticle = "default",
            disqusExcludedArticles = ["/default.md"],
            historyUrlBase = "//github.com/rkoeninger/rkoeninger.github.io/commits/master/articles/",
            commitsUrlBase = "//api.github.com/repos/rkoeninger/rkoeninger.github.io/commits?path=";

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

        function appendMdExtension(articleId) {
            return endsWith(articleId, ".md") ? articleId : articleId + ".md";
        }

        function getArticleFileName(queryString) {
            var articleId = getQsValue(queryString, "articleId");
            return appendMdExtension(articleId || defaultArticle);
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
            var matches = url.match(/(\x3F|\x26)articleId\x3D[^\x26]+/);

            if (matches) {
                return matches[0].substring(matches[0].indexOf("=") + 1);
            }

            return null;
        }

        function loadArticle(articleFile) {
            var articleUrl = getArticleUrl(articleFile),
                articleDiv = $("#main-article");

            $("#source-link").attr("href", articleUrl);
            $("#history-link").attr("href", historyUrlBase + articleFile);

            $.ajax({
                type: "GET",
                dataType: "text",
                url: articleUrl,
                success: function (articleMarkdown) {
                    articleDiv.html(marked(articleMarkdown));

                    if (contains(disqusExcludedArticles, articleUrl)) {
                        $("#disqus_thread").hide();
                    }

                    document.title = getPageTitle(articleMarkdown);

                    // Navigate within the site using PushState
                    $("a[href*='articleId=']").unbind().on("click", function (e) {
                        if (e.which !== 1) {
                            return true;
                        }

                        var url = $(this).attr("href"),
                            articleId = parseArticleId(url);
                        history.pushState({articleId: articleId}, "", url);
                        loadArticle(appendMdExtension(articleId));
                        return false;
                    });

                    window.onpopstate = function (event) {
                        loadArticle(appendMdExtension(event.state.articleId));
                    };

                    hljs.initHighlighting.called = false;
                    hljs.initHighlighting();

                    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
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

        function init() {
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

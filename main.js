/* On page load, get the value of the "articleId" argument in the query string
 * and pull the contents of the markdown file by that name in "/articles/"
 * abd use it to populate the page content.
 */

/*jslint browser: true, regexp: true*/
/*global marked, hljs*/

var disqusMarker = "<disqus>";

function queryString(key) {
  var qsParts, argAndVal, i;

  qsParts = window.location.search.substr(1).split("&");

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

function getArticleUrl() {
  var articleId, articleUrl;

  articleId = queryString("articleId");

  if (!articleId) {
    articleId = "default";
  }

  articleUrl = "/articles/" + articleId;

  if (!endsWith(articleUrl, ".md")) {
    articleUrl += ".md";
  }

  return articleUrl;
}

function setMarkdownLink() {
  var markdownLink = $("nav a#markdown-link");
  markdownLink.attr("href", getArticleUrl());
}

$(function () {
  var articleUrl, articleDiv, disqusDiv, request;

  articleUrl = getArticleUrl();

  setMarkdownLink();

  articleDiv = $("article#article0");
  disqusDiv = $("div#disqus_thread");

  request = {
    type: "GET",
    dataType: "text",
    url: articleUrl,
    success: function (articleMarkdown) {
      var titleMatches;

      articleDiv.html(marked(articleMarkdown));

      if (endsWith(articleUrl, "/default.md")) {
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
    error: function (jqXHR, textStatus, errorThrown) {
      articleDiv.html("failed to load article content<br />" + textStatus + "<br />" + errorThrown);
    }
  };

  $.ajax(request);
});

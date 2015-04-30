/* On page load, get the value of the "articleId" argument in the query string
 * and pull the contents of the markdown file by that name in "/articles/"
 * abd use it to populate the page content.
 */

/*jslint browser: true, regexp: true*/
/*global marked, hljs*/

var defaultArticle = "underConstruction";
var disqusExcludedArticles = ["/default.md", "/underConstruction.md"];
var historyUrlBase = "//github.com/rkoeninger/rkoeninger.github.io/commits/master/articles/";
var commitsUrlBase = "//api.github.com/repos/rkoeninger/rkoeninger.github.io/commits?path=";

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

function getArticleFileName() {
  var articleId = queryString("articleId");

  if (!articleId) {
    articleId = defaultArticle;
  }

  if (!endsWith(articleId, ".md")) {
    articleId += ".md";
  }

  return articleId;
}

function getArticleUrl() {
  return "/articles/" + getArticleFileName();
}

function setSourceLink() {
  var sourceLink = $("nav a#source-link");
  sourceLink.attr("href", getArticleUrl());
}

function setHistoryLink() {
  var historyLink = $("nav a#history-link");
  historyLink.attr("href", historyUrlBase + getArticleFileName());
}

function hideDisqusThreadMaybe(articleUrl, disqusDiv) {
  var i;
  for (i = 0; i < disqusExcludedArticles.length; ++i) {
    if (endsWith(articleUrl, disqusExcludedArticles[i])) {
      disqusDiv.hide();
      return;
    }
  }
}

function getCommitHistoryUrl() {
  return commitsUrlBase + getArticleUrl();
}

function setLastModifiedLabel(label) {
  var lastModifiedLabel = $("main div#last-modified");
  lastModifiedLabel.text(label);
}

$(function () {
  var articleUrl, articleDiv, disqusDiv;

  articleDiv = $("article#article0");
  disqusDiv = $("div#disqus_thread");

  setSourceLink();
  setHistoryLink();

  articleUrl = getArticleUrl();

  $.ajax({
    type: "GET",
    dataType: "text",
    url: articleUrl,
    success: function (articleMarkdown) {
      var titleMatches;

      articleDiv.html(marked(articleMarkdown));
      hideDisqusThreadMaybe(articleUrl, disqusDiv);

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
  });

  $.getJSON(
    getCommitHistoryUrl(),
    function (data) {
      var author, date;

      if (data.length > 0) {
        author = data[0].commit.author.name;
        date = new Date(data[0].commit.author.date).toLocaleDateString();
        setLastModifiedLabel("Last modified by " + author + " on " + date);
      }
    }
  );
});

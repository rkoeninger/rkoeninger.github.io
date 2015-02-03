function queryString(key) {
    var qsParts = window.location.search.substr(1).split("&");

    if (! (qsParts || key))
        return "";

    for (var i = 0; i < qsParts.length; ++i) {
        var p = qsParts[i].split("=");

        if (p.length !== 2)
            continue;

        if (p[0] === key)
            return decodeURIComponent(p[1].replace(/\+/g, " "));
    }

    return "";
}

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function getArticleUrl() {
    var articleId = queryString("articleId");

    if (! articleId)
        articleId = "default";

    var articleUrl = "./articles/" + articleId;

    if (! endsWith(articleUrl, ".md"))
        articleUrl += ".md";

    return articleUrl;
}

var disqusMarker = "<disqus>";

function insertDisqus(markdown) {
    if (markdown.indexOf(disqusMarker) > -1) {
        var divTag = document.createElement("div");
        divTag.id = "disqus_thread";
        var scriptTag = document.createElement("script");
        scriptTag.src = "//rkoeningergithubio.disqus.com/embed.js";
        var disqusHTML = divTag.outerHTML + scriptTag.outerHTML;
        return markdown.replace(disqusMarker, disqusHTML);
    }

    return markdown;
}

/* On page load, get the value of the "articleId" argument in the query string
 * (defaults to "default" if not present).
 * 
 * Pull the contents of the markdown file by that name under "/articles/".
 * 
 * Bake the markdown into HTML and replace the disqus marker with the disqus thread.
 * 
 * Substitute article HTML into the body of the page.
 */
$(function() {
    var articleDiv = $("article#article0");

    var request = {
        type: "GET",
        dataType: "text",
        url: getArticleUrl(),
        success: function (articleMarkdown) {
            articleDiv.html(marked(insertDisqus(articleMarkdown)));

            // pull title from first h1 (#) element
            var titleMatches = articleMarkdown.match(/\x23\x20(.*)\x0D?\x0A/);

            if (titleMatches)
                // strip markdown formatting
                document.title = $(marked(titleMatches[1]))[0].textContent;

            hljs.initHighlighting();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            articleDiv.html("failed to load article content<br />" + textStatus + "<br />" + errorThrown);
        }
    };

    $.ajax(request);
});
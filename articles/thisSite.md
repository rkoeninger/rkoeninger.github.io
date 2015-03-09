# This Site

## My First Tale of Win: You're Looking at It!

---

### Markdown

The prescribed way of using Markdown with GitHub pages seems to be using something like Jekell to pre-render the Markdown to HTML and check the HTML into Git along with the Markdown "source files". One can't run server-side scripts to do this with GitHub Pages, it seems, so you can't employ the more common method of rendering server-side.

I have this thing where I don't like data duplication or putting what could be considered "build output" in source control. So I wanted another way. And to not write HTML.

I found a couple of libraries: markdown-js, marked and the other one. I chose the one that supported GitHub-flavored markdown and better code language support (for obvious reasons).

These libs main means of use is by invoking their "main method" essentially, which is basically `MarkdownString -> DOM`. So I write markdown files instead and check them into the repo. The index.html page checks the query string for the article ID and uses that pull down the markdown file, render it and shove the result in the otherwise blank page.

---

### Page titles

Page titles are specified in the markdown using "hot comments" in the markdown.

---

### Disqus

I can't run a database or server-side comment engine off of GitHub Pages. I don't want to have to host my own separate comment server or anything, so just drop Disqus in there.

There's an arbitrary marker string that indicates where the Disqus widget should be placed. The HTML for the Disqus widget is inserted before the Markdown is baked.

---

### highlight.js

Needed to make the syntax look cool.

I appreciated that it comes with the same color scheme that I use in Sublime Text.

<disqus>

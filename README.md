# markdown-to-html
The simplest pure JavaScript markdown parser

[![CircleCI](https://img.shields.io/circleci/project/g105b/markdown-to-html.svg?style=flat-square)][circle-ci]

## Browser usage

### Plain JavaScript

It is possible to use this parser in a web context without using any dependency management. Adding the source directly to a website source will attach the `MarkdownToHtml` object to the current `window`. Check out the following example for the simplest in-browser usage:

```html
<!doctype html>
<script src="./src/markdown-to-html.min.js"></script>

<div id="example-markdown-content">
# Hello, Markdown!

Here is some example **formatting** in _Markdown_.

The following JavaScript will transform this content to clean HTML.
</div>

<script>
var element = document.getElementById("example-markdown-content");
element.innerHTML = MarkdownToHtml.parse(element.innerHTML);
</script>
```

### Requiring with a dependency management tool

/* TODO */

## Node compatibility

Require the script in node to obtain an object with the single `parse` method:

```js
var markdownToHtml = require("./src/markdown-to-html.js"),
    markdown = "# This is a heading";

markdownToHtml.parse(markdown); // Returns: <h1>This is a heading</h1>
```

## Testing

Unit tests are written using [tape]. The test runner file loops over all files within the Markdown.mdtest directory.

Within the Markdown.mdtest directory are multiple `.text` and `.html` files with matching names. The contents of each `.text` file will be parsed and compared with the `.html` counterpart.

Run the tests by executing:

```
node test/testRunner.js
```

[circle-ci]: https://circleci.com/gh/g105b/markdown-to-html
[tape]: https://github.com/substack/tape
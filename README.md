# markdown-to-html
The simplest pure JavaScript markdown parser

## Browser compatibility

There is no need to use any module loader to start using this parser. Check out the following example for the simplest in-browser usage:

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

## Node compatibility

Require the script in node to obtain an object with the single `parse` method:

```js
var markdownToHtml = require("./src/markdown-to-html.js"),
    markdown = "# This is a heading";

markdownToHtml.parse(markdown); // Returns: <h1>This is a heading</h1>
```
# markdown-to-html
The simplest pure JavaScript markdown parser

![CircleCI](https://img.shields.io/circleci/project/g105b/markdown-to-html.svg?style=flat-square)

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

## Testing

Unit tests are written using [tape]. The test runner file loops over all files within the Markdown.mdtest directory, based on the [mdtest] repository.

Within the Markdown.mdtest directory are multiple `.text` and `.xhtml` files with matching names. The contents of each `.text` file will be parsed and compared with the `.xhtml` counterpart.

Run the tests by executing:

```
node test/testRunner.js
```

[tape]: https://github.com/substack/tape
[mdtest]: https://github.com/michelf/mdtest
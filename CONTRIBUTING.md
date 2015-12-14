## Testing

Unit tests are written using [tape]. The test runner file loops over all files within the Markdown.mdtest directory.

Within the Markdown.mdtest directory are multiple `.text` and `.html` files with matching names. The contents of each `.text` file will be parsed and compared with the `.html` counterpart.

Run the tests by executing:

```
node test/testRunner.js
```

[tape]: https://github.com/substack/tape
;(function() { "use strict";

var
	/**
	 * Used to attach MarkdownToHtml object to `window` in browser
	 * context, or as an AMD module where appropriate.
	 * @type {Object}
	 */
	exports,

	/**
	 * An array of parse rule descriptor objects. Each object has two keys;
	 * pattern (the RegExp to match), and replace (the replacement string or
	 * function to execute).
	 * @type {Array}
	 */
	parseMap = [
		{
			// <h1>
			pattern: /(#{1,6})(.*)/g,
			replace: heading,
		},
		{
			// <p>
			pattern: /\n([^\n]+)\n/g,
			replace: paragraph,
		},
		{
			// <strong>
			pattern: /(\*\*|__)(.*?)\1/g,
			replace: "<strong>$2</strong>",
		},
		{
			// <em>
			pattern: /(\*|_)(.*?)\1/g,
			replace: "<em>$2</em>",
		},
		{
			// <a>
			pattern: /([^!])\[([^\[]+)\]\(([^\)]+)\)/g,
			replace: "$1<a href=\"$3\">$2</a>",
		},
		{
			// <img>
			pattern: /!\[([^\[]+)\]\(([^\)]+)\)/g,
			replace: "<img src=\"$2\" alt=\"$1\" />",
		},
	],
$$;

/**
 * Self-executing function to handle exporting the parse function for
 * external use.
 */
(function go() {
	// Export AMD module if possible.
	if(typeof module !== "undefined"
	&& typeof module.exports !== "undefined") {
		exports = module.exports;
	}
	// Otherwise check for browser context.
	else if(typeof window !== "undefined") {
		window.MarkdownToHtml = {};
		exports = window.MarkdownToHtml;
	}

	exports.parse = parse;
})();

/**
 * Parses a provided Markdown string into valid HTML.
 *
 * @param  {string} string Markdown input for transformation
 * @return {string}        Transformed HTML output
 */
function parse(string) {
	var
		// Pad with newlines for compatibility.
		string = "\n" + string + "\n",
	$$;

	parseMap.forEach(function(p) {
		// Replace all matches of provided RegExp pattern with either the
		// replacement string or callback function.
		string = string.replace(p.pattern, p.replace);
	});

	// Trim for any spaces or newlines.
	string = string.trim();
	// Tidy up newlines to condense where more than 2 occur back to back.
	string = string.replace(/[\n]{3,}/g, "\n\n");
	return string;
}

/**
 * Replacement function for heading elements.
 * @param  {string} text    Original text including any markdown
 * @param  {string} hashes  String containing n hash characters
 * @param  {string} content Header text content
 * @return {string}         HTML representation of element
 */
function heading(text, hashes, content) {
	var tag = new Tag("h" + hashes.length);
	return [tag.open(), content.trim(), tag.close(), "\n"].join("");
}

/**
 * Replacement function for paragraph elements.
 * @param  {string} text    Original text including any markdown
 * @param  {string} content Paragraph text content
 * @return {string}         HTML representation of element
 */
function paragraph(text, content) {
	var
		content = content.trim(),
		tag = new Tag("p"),
	$$;

	// Do not transform if the line starts with an HTML tag — already done!
	if(/^<\/?\w+>/i.test(content)) {
		// QUESTION: Would it help in any way to pad content with newlines?
		// return ["\n", content, "\n"].join("");
		return content;
	}

	return [tag.open(), content.trim(), tag.close(), "\n"].join("");
}

function Tag(tagName) {
	function open() {
		switch(tagName) {
		default:
			return ["<", tagName, ">"].join("");
		}
	}

	function close() {
		switch(tagName) {
		default:
			return ["</", tagName, ">"].join("");
		}
	}

	return {
		open: open,
		close: close,
	}
}

})();
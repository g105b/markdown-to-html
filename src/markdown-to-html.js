;(function() { "use strict";

var
	BLOCK = "block",
	INLINE = "inline",

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
			// A line starting with 1-6 hashes.
			pattern: /(#{1,6})([^\n]+)/g,
			replace: "<h$L1>$2</h$L1>",
			type: BLOCK,
		},
		{
			// <p>
			// Any line surrounded by newlines that doesn't start with
			// an HTML tag.
			pattern: /\n(?!<\/?\w+>)([^\n]+)\n/g,
			replace: "<p>$1</p>",
			type: BLOCK,
		},
		{
			// <strong>
			// Either two asterisks or two underscores, followed by any
			// characters, followed by the same two starting characters.
			pattern: /(\*\*|__)(.*?)\1/g,
			replace: "<strong>$2</strong>",
			type: INLINE,
		},
		{
			// <em>
			// Either one asterisk or one underscore, followed by any
			// characters, followed by the starting character.
			pattern: /(\*|_)(.*?)\1/g,
			replace: "<em>$2</em>",
			type: INLINE,
		},
		{
			// <a>
			// Not starting with an exclamation mark, square brackets
			// surrounding any characters, followed by parenthesis surrounding
			// any characters.
			pattern: /([^!])\[([^\[]+)\]\(([^\)]+)\)/g,
			replace: "$1<a href=\"$3\">$2</a>",
			type: INLINE,
		},
		{
			// <img>
			// Starting with an exclamation mark, then followed by square
			// brackets surrounding any characters, followed by parenthesis
			// surrounding any characters.
			pattern: /!\[([^\[]+)\]\(([^\)]+)\)/g,
			replace: "<img src=\"$2\" alt=\"$1\" />",
			type: INLINE,
		},
		{
			// <del>
			// Double tilde characters surrounding any characters.
			pattern: /\~\~(.*?)\~\~/g,
			replace: "<del>$1</del>",
			type: INLINE,
		},
		{
			// <blockquote>
			// A greater-than character preceding any characters.
			pattern: /\n(&gt;|\>)(.*)/g,
			replace: "<blockquote>$1</blockquote>",
			type: BLOCK,
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
		string = string.replace(p.pattern, function() {
			// console.log(this, arguments);
			return replace.call(this, arguments, p.replace, p.type);
		});
	});

	// Trim for any spaces or newlines.
	string = string.trim();
	// Tidy up newlines to condense where more than 2 occur back to back.
	// string = string.replace(/[\n]{3,}/g, "\n");
	return string;
}

function replace(matchList, replacement, type) {
	var
		i,
	$$;

	for(i in matchList) {
		if(!matchList.hasOwnProperty(i)) {
			continue;
		}

		// Replace $n with the matching regexp group.
		replacement = replacement.split("$" + i).join(matchList[i]);
		// Replace $Ln with the matching regexp group's string length.
		replacement = replacement.split("$L" + i).join(matchList[i].length);
	}

	if(type === BLOCK) {
		replacement = replacement + "\n";
	}

	return replacement;
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
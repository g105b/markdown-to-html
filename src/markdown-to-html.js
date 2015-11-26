;(function() { "use strict";

var
	exports,
	parseMap = [
		{
			pattern: /(#{1,6})(.*)/g,
			replace: header,
		},
		{
			pattern: /\n([^\n]+)\n/g,
			replace: paragraph
		},
	],
$$;

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

function parse(string) {
	var
		string = "\n" + string + "\n",
	$$;

	parseMap.forEach(function(p) {
		string = string.replace(p.pattern, p.replace);
	});

	string = string.trim();
	string = string.replace(/[\n]{3,}/, "\n\n");
	return string;
}

function header(text, hashes, content) {
	var tag = new Tag("h" + hashes.length);
	return [tag.open(), content.trim(), tag.close(), "\n"].join("");
}

function paragraph(text, content) {
	var
		content = content.trim(),
		tag = new Tag("p"),
	$$;

	if(/^<\/?/.test(content)) {
		return ["\n", content, "\n"].join("");
	}

	return ["\n", tag.open(), content, tag.close(), "\n"].join("");
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
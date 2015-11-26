;(function() { "use strict";

var
	exports,
	patternMap = {
		paragraph: /\n([^\n]+)\n/g,
	},
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
		line,
		// nstatus,
		i = 0,
		j = 0,
		string = "\n" + string + "\n",
		tmp,
	$$;

	while( (tmp = patternMap.paragraph.exec(string)) !== null) {
		string = string.replace(
			tmp[0],
			[
				"<p>",
				tmp[1],
				"</p>"
			].join("")
			+ "\n"
		);
	}

	return string;
}

})();
"use strict";
var
	pathRoot = [__dirname, ".."].join("/"),
	scriptPath = [pathRoot, "src", "markdown-to-html.js"].join("/"),

	fs = require("fs"),
	test = require("tape"),
	markdownToHtml = require(scriptPath),

	unitDirectory = [pathRoot, "test", "Markdown.mdtest"].join("/"),

	TYPE_TEXT = "text",
	TYPE_HTML = "xhtml",
$$;

fs.readdir(unitDirectory, function(err, list) {
	if(err) {
		console.log("Error", err);
		return 1;
	}

	list.forEach(executeTest);
});

function executeTest(file) {
	var
		lastDot = file.lastIndexOf("."),
		ext = file.substr(lastDot + 1),
		basename = file.substr(0, lastDot),
	$$;

	if(ext !== "text") {
		return;
	}

	test(basename, function(t) {
		var
			mdContent = readFile(basename, TYPE_TEXT),
			htmlContent = readFile(basename, TYPE_HTML),
		$$;

		t.equal(markdownToHtml.parse(mdContent), htmlContent);
		t.end();
	});
}

function readFile(basename, type) {
	var path = [unitDirectory, basename].join("/") + "." + type;
	return fs.readFileSync(path, "utf8");
}
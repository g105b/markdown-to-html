"use strict";
var
	fs = require("fs"),
	test = require("tape"),
	markdownToHtml = require(__dirname + "/../src/markdown-to-html.js"),

	unitDirectory = __dirname + "/Markdown.mdtest",
$$;

fs.readdir(unitDirectory, function(err, list) {
	if(err) {
		console.log("Error", err);
		return 1;
	}

	list.forEach(executeTest);
});

function executeTest(file) {
	test(file, function(t) {
		t.equal("You are parsing: TEST!", markdownToHtml.parse("TEST!"));
		t.end();
	});
}
"use strict";
var
	fs = require("fs"),
	test = require("tape"),

	unitDirectory = "Markdown.mdtest",
$$;

fs.readdir(unitDirectory, function(err, list) {
	if(err) {
		console.log("Error", err);
		return 1;
	}

	list.forEach(executeTest);
});

function executeTest(file) {
	console.log(file);
}
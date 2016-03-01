module.exports = function(context) {
	"use strict";

	return function(message, lines) {
		let gitContext = context.git;
		lines.shift(); // Remove the short description

		if (!gitContext || !gitContext.patches) {
			return;
		}

		for (let patch of gitContext.patches) {
			let path = patch.newFile().path();
			let used = lines.some(function(line) {
				return line.indexOf(path) === 0;
			});

			if (!used) {
				context.report({
					message: `Missing path to file \"${path}\".`,
					loc: {
						line: lines.length + 1,
						column: lines[lines.length - 1].length
					}
				});
			}
		}
	};
};

module.exports.schema = [];
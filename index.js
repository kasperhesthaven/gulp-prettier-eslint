'use strict';

const through = require('through2');
const pluginErr = require('plugin-error');
const prettierEslint = require('prettier-eslint');
const applySourceMap = require('vinyl-sourcemaps-apply');

function gulpPrettierEslint(opts = {}) {
	return through.obj(function (file, enc, cb) {
		if (file.isNull()) return cb(null, file);
		if (file.isStream()) {
			return cb(new pluginErr({
				plugin: 'gulp-prettier-eslint',
				message: 'Streaming not supported'
			}));
		};

		const text = file.contents.toString('utf8');
		const filePath = file['history'].toString();
		let result;

		try {
			result = prettierEslint(Object.assign(opts, {
				text
			}))
		} catch (err) {
			err.filePath = filePath.substring(filePath.lastIndexOf('\\') + 1);
			return cb(
				new pluginErr({
					plugin: 'gulp-prettier-eslint',
					message: err
				})
			);
		}

		if (result && result.v3SourceMap && file.sourceMap) {
			applySourceMap(file, result.v3SourceMap);
			file.contents = new Buffer(result.js);
		} else {
			file.contents = new Buffer(result);
		}

		file.contents = new Buffer(result);
		cb(null, file);
	})
}

module.exports = gulpPrettierEslint;
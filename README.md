# Gulp Prettier Eslint

A [Gulp](http://gulpjs.com/) plugin which allows the users to use [Prettier Eslint](https://github.com/prettier/prettier-eslint).

## Installation
`npm install @kasperhesthaven/gulp-prettier-eslint`

## Usage

### Options
[prettier-eslint#options](https://github.com/prettier/prettier-eslint#options)

### Gulp
```js
import prettierEslint from 'gulp-prettier-eslint';

gulp.task('js-lint', () =>
	gulp.src('glob.js')
		.pipe(prettierEslint({
			eslintConfig: {
				parserOptions: {
      		ecmaVersion: 7
    		}
			},
			prettierOptions: {
				singleQuote: true,
				useTabs: true
			},
			logLevel: 'warn'
		}))
);
```

### Plumber example
```js
.pipe(plumber({ errorHandler: (err) => {
	console.log(`JS lint error in ${err.message.filePath}`);
	console.log(`${err.message.loc.start.line}:${err.message.loc.start.column} ${err.message}`)
}}))
```
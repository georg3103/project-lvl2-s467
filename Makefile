install:
	npm install

start:
	npx babel-node -- src/bin/gendiff.js

test:
	npm run test

coveralls:
	npm run coveralls

publish:
	npm publish

lint:
	npx eslint .
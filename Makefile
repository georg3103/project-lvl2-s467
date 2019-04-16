install:
	npm install

start:
	npx babel-node -- src/bin/gendiff.js

test:
	npm run test

publish:
	npm publish

lint:
	npx eslint .
dist/%.js: src/*.ts 
	yarn run tsc

README.md: dist/index.js dist/example.js _README.md
	node dist/example.js

.PHONY: build

build: README.md dist/index.js

.PHONY: start

start: dist/example.js
	node $<

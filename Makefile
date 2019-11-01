dist/%.js: src/%.ts
	tsc

README.html: dist/index.js _README.md
	cat _README.md | node $< > $@

.PHONY: build

build: README.html dist/index.js

.PHONY: start

start: dist/index.js
	node $<

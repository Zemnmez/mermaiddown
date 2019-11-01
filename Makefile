dist/%.js: src/%.ts
	tsc

README.md: dist/index.js _README.md
	cat _README.md | node $<

.PHONY: build

build: README.md dist/index.js

.PHONY: start

start: dist/index.js
	node $<

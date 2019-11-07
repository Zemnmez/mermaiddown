dist/%.js: src/*.ts | dist/mermaid.min.js dist/index.html
	tsc

dist/mermaid.min.js: node_modules/mermaid/dist/mermaid.min.js
	cp $< $@

dist/index.html: src/index.html
	cp $< $@

README.md: dist/index.js _README.md
	cat _README.md | node $< > $@

.PHONY: build

build: README.md dist/index.js

.PHONY: start

start: dist/example.js
	node $<

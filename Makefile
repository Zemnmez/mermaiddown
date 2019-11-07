dist/%.js: src/*.ts dist/mermaid.min.js dist/index.html
	yarn run tsc

dist/mermaid.min.js: node_modules/mermaid/dist/mermaid.min.js
	cp $< $@

dist/index.html: src/index.html
	cp $< $@

README.md: dist/index.js dist/example.js _README.md
	node dist/example.js

.PHONY: build

build: README.md dist/index.js

.PHONY: start

start: dist/example.js
	node $<

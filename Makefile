# Makefile for OpenMapTiles

PKL_DIR=style-generation
DOCS_DIR=docs
PUBLIC_DIR=public

PKL_FILES=$(wildcard $(PKL_DIR)/*.pkl)
DOCS_JSON=$(patsubst $(PKL_DIR)/%.pkl,$(DOCS_DIR)/%.json,$(PKL_FILES))
PUBLIC_JSON=$(patsubst $(PKL_DIR)/%.pkl,$(PUBLIC_DIR)/%.json,$(PKL_FILES))

style: $(DOCS_JSON) $(PUBLIC_JSON)

$(DOCS_DIR)/%.json: $(PKL_DIR)/%.pkl
	@echo "Generating $@ from $<"
	@mkdir -p $(DOCS_DIR)
	pkl eval -f json $< --output-path $@

$(PUBLIC_DIR)/%.json: $(PKL_DIR)/%.pkl
	@echo "Generating $@ from $<"
	@mkdir -p $(PUBLIC_DIR)
	pkl eval -f json $< --output-path $@

build:
	npm run build

deploy:
	cp -r dist/* docs/

.PHONY: clean
clean:
	@echo "Cleaning generated files"
	@rm -f $(DOCS_JSON) $(PUBLIC_JSON)


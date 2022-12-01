SHELL:=/bin/bash

NG := "./node_modules/@angular/cli/bin/ng.js"

$(shell cp -n .config.default config.ini)
-include config.ini

local:
	$(NG) serve --port $(port) --host 127.0.0.1 --public-host "$(domain)"


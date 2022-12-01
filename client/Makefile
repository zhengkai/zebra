SHELL:=/bin/bash

NG := "./node_modules/@angular/cli/bin/ng.js"

$(shell cp -n .config.default config.ini)
-include config.ini

local:
	$(NG) serve --port $(port) --host 127.0.0.1 --public-host "$(domain)"

init:
	NG_CLI_ANALYTICS=ci npm install
	# ./node_modules/sass-migrator/sass-migrator.js division './node_modules/font-awesome/scss/*.scss'
	# npm audit fix

prod:
	./dist/build.sh zlib.9farm.com prod
	ssh dart 'mkdir -p /www/zlib/client'
	rsync --partial -vzrtopg -e ssh ./dist/prod/ dart:/www/zlib/client/

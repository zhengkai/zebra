SHELL:=/bin/bash

NG := "./node_modules/@angular/cli/bin/ng.js"

$(shell cp -n .config.default config.ini)
-include config.ini

local:
	@if [ ! -d node_modules ]; then NG_CLI_ANALYTICS=ci npm install; fi
	$(NG) serve --port $(port) --host 127.0.0.1 --public-host "$(domain)"

init:
	NG_CLI_ANALYTICS=ci npm install
	# ./node_modules/sass-migrator/sass-migrator.js division './node_modules/font-awesome/scss/*.scss'
	# npm audit fix

prod:
	./dist/build.sh zebra.9farm.com prod
	ssh dart 'mkdir -p /www/zebra/client'
	rsync --partial -vzrtopg -e ssh ./dist/prod/ dart:/www/zebra/client/
	scp ../misc/nginx/prod.conf dart:/www/zebra/nginx.conf

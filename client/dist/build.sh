#!/bin/bash -e

#
# 主要是执行 ng build，额外有这么几点：
#
# 先生成到临时目录，再 rsync 过去，这样编译过程中不影响原目录访问
#
# 大于 1KB 的文件打 gzip，方便 nginx
#

DOMAIN="$1"
SUB_DIR="$2"
if [ -z "$DOMAIN" ] || [ -z "$SUB_DIR" ]; then
	>&2 echo
	>&2 echo "usage: $0 [domain] [sub_dir]"
	>&2 echo
	exit 1
fi

DIR=$(readlink -f "$0") && DIR=$(dirname "$DIR") && cd "$DIR"
cd ..

#if [ ! -f ./src/pb/pb.js ]; then
#	>&2 echo protobuf not generated
#	exit 1
#fi

URL="https://${DOMAIN}/"

TMP_DIR="dist/.${SUB_DIR}-tmp"
SUB_DIR="dist/${SUB_DIR}"

echo
echo "  url: $URL"
echo "  dir: $SUB_DIR"
echo

set -x

NG_CLI_ANALYTICS=ci ./node_modules/@angular/cli/bin/ng.js \
	build --configuration production --output-path "$TMP_DIR" --base-href "$URL"

mkdir -p "$SUB_DIR"

rsync -r --delete "${TMP_DIR}/." "$SUB_DIR"

find "$SUB_DIR" -size +1k -type f \( -name '*.html' -o -name '*.css' -o -name '*.js' -o -name '*.txt' -o -name '*.svg' -o -name '*.ico' \) -exec gzip -k --best {} \;
find "$SUB_DIR" -size +1k -type f \( -name '*.html' -o -name '*.css' -o -name '*.js' -o -name '*.txt' -o -name '*.svg' -o -name '*.ico' \) -exec brotli -Z {} \;

#!/bin/bash

COLOR="#3f51b5"

cd "$(dirname "$(readlink -f "$0")")" || exit 1

convert ./original.png -resize 512x512 -gravity center -background "$COLOR" -extent 512x512 readme.webp

convert readme.webp -resize 128x128 ../../client/src/assets/favicon.ico
convert readme.webp -resize 96x96 ../../client/src/assets/logo.webp

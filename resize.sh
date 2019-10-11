#!/bin/bash

# resize all (new modified date will be set, even if the files themselves are not modified)
#for i in static/images/*.{jpg,jpeg,JPG}; do
#    printf "."
#    convert "$i" -resize 1800x1800\> "$i"
#done
#printf "\n"

# resize only images that need resizing
exiftool  -q -ext jpg -ext JPG -ext jpeg static/images -if '
	$ImageWidth > 1800 || $ImageHeight > 1800 and
		!print "$Directory/$Filename\0"' |  xargs -0 -R 2 -I -t "%" convert -resize "1800x1800>" "%" "%"

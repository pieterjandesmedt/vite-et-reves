#!/bin/bash

# resize only images that need resizing
exiftool  -q -ext jpg -ext JPG -ext jpeg static/images -if '
    $ImageWidth > 1800 ||
    $ImageHeight > 1800 and
    !print "$Directory/$Filename\0"' |  xargs -0 -R 2 -I "%" sqip -i "%" -n 100 -b 12 -o "./static/images/lqip/"

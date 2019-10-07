#!/bin/bash

for i in static/images/*.{jpg,jpeg,JPG,JPEG}; do
    printf "Resize $i\n"
    convert "$i" -resize 1800x1800 "$i"
done

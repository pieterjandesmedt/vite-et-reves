#!/bin/bash

for i in static/images/*.{jpg,jpeg,JPG,JPEG}; do
    printf "."
    convert "$i" -resize 1800x1800 "$i"
done
printf "\n"

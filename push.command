#! /bin/bash
NOW=$(date +"%Y-%m-%d (%A) %H:%M:%S")
MESSAGE="Update '$NOW'"

cd "`dirname "$0"`"
git add .
git commit -a -m "$MESSAGE"
git push
aws s3 sync static/images/ s3://vite-et-reves


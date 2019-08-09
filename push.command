#! /bin/bash
NOW=$(date +"%Y-%m-%d (%A) %H:%M:%S")
MESSAGE="Update '$NOW'"
git add .
git commit -a -m "$MESSAGE"
aws s3 sync static/images/ s3://vite-et-reves


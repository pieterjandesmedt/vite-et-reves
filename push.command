#! /bin/bash
NOW=$(date +"%Y-%m-%d (%A) %H:%M:%S")
git add .
git commit -a -m 'Update $NOW'
aws s3 sync static/images/ s3://vite-et-reves


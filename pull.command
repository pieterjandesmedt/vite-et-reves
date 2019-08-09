#! /bin/bash
cd "`dirname "$0"`"
git pull
aws s3 sync s3://vite-et-reves static/images/

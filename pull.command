#! /bin/bash
git pull
aws s3 sync s3://vite-et-reves static/images/

#! /bin/bash
NOW=$(date +"%Y-%m-%d (%A) %H:%M:%S")
MESSAGE="Update '$NOW'"

cd "`dirname "$0"`"
echo "Pushing texts..."
git add .
git commit -a -m "$MESSAGE"
git push
echo "Pushing images..."
aws s3 sync static/images/ s3://vite-et-reves
echo "Done. Thi site will be online in a minute or so."
echo "You can close this window."

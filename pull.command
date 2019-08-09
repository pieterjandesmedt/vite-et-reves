#! /bin/bash
cd "`dirname "$0"`"
echo "Pulling texts..."
git pull
echo "Pulling images..."
aws s3 sync s3://vite-et-reves static/images/
echo "Done."
echo "You can close this window."

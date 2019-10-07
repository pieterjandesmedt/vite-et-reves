#! /bin/bash
NOW=$(date +"%Y-%m-%d (%A) %H:%M:%S")
MESSAGE="Update '$NOW'"

GREEN="\033[0;32m"
YELLOW="\033[1;33m"
NOCOLOR="\033[0m"

cd "`dirname "$0"`"
echo -e "${YELLOW}\nPushing texts...${NOCOLOR}"
git add .
git commit -a -m "$MESSAGE"
git push

echo -e "${YELLOW}\nResizing images...${NOCOLOR}"
./resize.sh

echo -e "${YELLOW}\nPushing images...${NOCOLOR}"
aws s3 sync static/images/ s3://vite-et-reves

echo -e "${GREEN}\nDone. The site will be online in a minute or so.${NOCOLOR}"
echo -e "You can close this window.\n"

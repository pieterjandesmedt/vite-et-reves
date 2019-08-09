#! /bin/bash
GREEN="\033[0;32m"
YELLOW="\033[1;33m"
NOCOLOR="\033[0m"

cd "`dirname "$0"`"
echo -e "${YELLOW}\nPulling texts...${NOCOLOR}"
git pull
echo -e "${YELLOW}\nPulling images...${NOCOLOR}"
aws s3 sync s3://vite-et-reves static/images/
echo -e "${GREEN}Done.${NOCOLOR}"
echo -e "You can close this window.\n"

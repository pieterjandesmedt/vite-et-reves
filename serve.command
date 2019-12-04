#! /bin/bash
cd "`dirname "$0"`"
sleep 1 && open http://localhost:1313 &
hugo serve

#!/bin/bash
git fetch --all &&
git reset --hard origin/master &&
cp favicon.png index.html robots.txt spain.mp4 ~/www/root

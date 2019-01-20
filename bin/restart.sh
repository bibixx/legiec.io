#!/bin/bash
git fetch --all &&
git reset --hard origin/master &&
mkdir -p /home/www/html/root &&
rm -rf /home/www/html/root/* &&
rsync --quiet -av --progress --exclude="bin" ./ /home/www/html/root/

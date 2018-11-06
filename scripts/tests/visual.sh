#!/bin/sh

# ------------------------
# Run TestCafe visual comparaison between images
#
# ---
# USAGE:
# `yarn test:visual`
#
# ---
# NOTE:
# l'option `--force` n'est pas passer via le script.sh
# Utiliser directement la ligne de commande testcafe
# `./node_modules/.bin/testcafe [...options] --force`

BROWSER='chrome:headless'
OUTPUT_PATH=testcafe/screenshots
SCRIPT_FILE=scripts/tests/screenshots-compare.js

case "$1" in
  -f|--force)
    ./node_modules/.bin/testcafe $BROWSER $SCRIPT_FILE -s $OUTPUT_PATH --force
    ;;
  *)
    ./node_modules/.bin/testcafe $BROWSER $SCRIPT_FILE -s $OUTPUT_PATH
    ;;
esac

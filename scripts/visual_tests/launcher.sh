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

OUTPUT_PATH=./
CWD=$(dirname "$0")
BROWSER='chrome:headless'
SCRIPT_FILE=$CWD/screenshots-compare.js

testcafe $BROWSER $SCRIPT_FILE -s $OUTPUT_PATH $1

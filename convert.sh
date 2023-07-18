#!/bin/sh

if [ -e "html" ]; then
    find html -name "*.html" -exec rm {} +
fi
find vault -name "*.md" -exec sh -c 'echo {} | sed "s/.md\|vault\///g" | sed "s/^.*$/--from gfm --to html vault\/\0.md -o html\/\0.html/g" | xargs pandoc ' \;


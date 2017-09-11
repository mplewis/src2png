#!/bin/bash

# http://redsymbol.net/articles/unofficial-bash-strict-mode/
set -euo pipefail
IFS=$'\n\t'

./src2png test/fixtures/code/input/*
test/utils/images_identical tmp/example.cpp.png test/fixtures/code/output/example.cpp.png
test/utils/images_identical tmp/example.jsx.png test/fixtures/code/output/example.jsx.png
test/utils/images_identical tmp/example.py.png test/fixtures/code/output/example.py.png
test/utils/images_identical tmp/example.rb.png test/fixtures/code/output/example.rb.png

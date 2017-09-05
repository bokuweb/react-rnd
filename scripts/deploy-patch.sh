#!/bin/bash

git config --global -l
git config --global user.email bokuweb12@gmail.com
git config --global user.name bokuweb
git remote --v
git reset --hard HEAD
npm version patch
git push origin master
git push --tags
npm publish

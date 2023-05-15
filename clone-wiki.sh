#!/bin/sh

TEMP_CLONE_FOLDER="temp_wiki_$GITHUB_SHA"
WIKI_DIR=".github/wiki"

if [ -z "$GITHUB_TOKEN" ]; then
  echo "GITHUB_TOKEN is missing."
  exit 1
fi

# Disable Safe Repository checks
git config --global --add safe.directory "/github/workspace"
git config --global --add safe.directory "/github/workspace/$TEMP_CLONE_FOLDER"
git clone https://$GITHUB_NAME:$GITHUB_TOKEN@github.com/$GITHUB_REPOSITORY.wiki.git $TEMP_CLONE_FOLDER

echo "Copying files to Wiki"
# Configuring a file to exclude specified files
if [ -z "$EXCLUDED_FILES" ]; then
  rsync -av --delete $WIKI_DIR $TEMP_CLONE_FOLDER/ --exclude .git
else
  for file in $EXCLUDED_FILES; do
    echo "$file" >> ./$TEMP_EXCLUDED_FILE
  done
  rsync -av --delete $WIKI_DIR $TEMP_CLONE_FOLDER/ --exclude .git --exclude-from=$TEMP_EXCLUDED_FILE
  # Delete files in target repo if it was a reminant.
  for file in $EXCLUDED_FILES; do
    rm -r $TEMP_CLONE_FOLDER/$file
  done
fi

echo "Pushing to Wiki"
cd $TEMP_CLONE_FOLDER
git config user.name $GITHUB_ACTOR
git config user.email $GITHUB_ACTOR@users.noreply.github.com
git add .
git commit -m "$message"
git push origin master
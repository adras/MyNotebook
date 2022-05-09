# MyNotebook

## Introduction
This will be the successor of my old sourceforce project MyNotebook.

Currently an angular.js frontend is in development. At a later stage the old PHP backend will be replaced 
by something else.

# Sourceforge project
The old sourceforge sourcecode can be found in the backend/php subdirectory.

In general the setup process should be something like:
1. upload everything from the php folder to your server
2. open install.php in your browser
3. open upgrade.php in your browser

It may happen that this no longer works properly, so feel free to open an issue on github.

# angular project
This project is currently a work in progress. So far you can only login, and select tags.

Once the old php project is running you can configure the new angular.js to use it as a backend.

In order to do so you need to update a few files to point to your php-backend.

All files need a url which points to the index.php of your MyNotebook installation.

## proxy.conf.json
This file is required to avoid CORS issues when running the program locally. The proxy basically maps the path of 
your backend to localhost so any CORS issues are avoided. That proxy is not active in a production environment.

## src/environment.prod.ts
This file is required for the production environment to run properly.

## src/environment.ts
This file is required for the local testing environment to run properly.

IMPORTANT: Node.js server needs to be restarted after making these changes. This is because the proxy.conf.json is used
during startup of Node.js server

## git-ignore changes
To avoid these changes being committed you can use the ```--skip-worktree``` git parameter.
To do that, execute the following git commands in the Frontend directory:
git update-index --skip-worktree proxy.conf.json
git update-index --skip-worktree src/environments/environment.ts
git update-index --skip-worktree src/environments/environment.prod.ts

To undo this use the ```--no-skip-worktree``` parameter:
git update-index --no-skip-worktree proxy.conf.json
git update-index --no-skip-worktree src/environments/environment.ts
git update-index --no-skip-worktree src/environments/environment.prod.ts

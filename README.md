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

# angular.js project

Once the old php project is running you can configure the new angular.js to use it as a backend.

In order to do so you need to update two files to point to your php-backend

Both files need a url which points to the index.php of your MyNotebook installation.

## proxy.conf.json
This file is required to avoid CORS issues when running the program locally. The proxy basically maps the path of 
your backend to localhost so any CORS issues are avoided. That proxy is not active in a production environment.

## src/environment.prod.ts
This file is required for the production environment to run properly.
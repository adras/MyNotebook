# Install
Please read the install and upgrade paragraphs before you start.

## Install mynotebook-delta
There exists only an install script for mynotebook-delta, but not for mynotebook-uranus which is the most recent version.
Therefore step one is to run the old install script, and then run an upgrade script to convert the database from delta to uranus.

The install script creates several tables, so you need to enter a table-prefix during install. As backup during the upgrade
these tables are not deleted. New tables with a different prefix will be created by the upgrade script.

Therefore it is suggested that you directly use an `old` suffix for the table-names in the install script. E.g. "MyNotebook_old"

1. upload everything from the php folder to your server
2. open install.php in your browser
3. fill out the form

If everything worked, you should see "Database created successfully"

## Upgrade database
In upgrade.php, 'Old database prefix' is the 'database table name' from install.php

'new database prefix' will be the new database table prefix. Choose the final name you'd like the tables to have

3. open upgrade.php in your browser
4. fill out the form

If everything worked, you should see a "Success" message.

After the upgrade you can delete the tables from install.php with the "old" suffix.

## Old Uranus-Upgrade
Uranus-Databases need a manual update since the encoding changed from utf8_unicode_ci to: utf8_general_ci

## upgrade config.php
Since the upgrade script does not update the config, you have to do it manually. The config.php was rewritten by the install.php script and uses the mynotebook-delta file format. However now you need the mynotebook-uranus file format. Luckily, the config.php which comes with this repo already has the
mynotebook-uranus format. So all you need to do is to update the Backend/php/config.php with your credentials and tablenames (choose the "new table prefix" from upgrde.php). Upload the file, and you should be able to login.

> Make sure to delete install.php and upgrade.php when you're done.

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
This file is required for the local testing environment to run properly. ONLY update the path, not the hostname. The
hostname has to be localhost


IMPORTANT: Node.js server needs to be restarted after making these changes. This is because the proxy.conf.json is used
during startup of Node.js server

## git-ignore changes
To avoid these changes being committed you can use the ```--skip-worktree``` git parameter.
To do that, execute the following git commands in the Frontend directory:
```
git update-index --skip-worktree proxy.conf.json
git update-index --skip-worktree src/environments/environment.ts
git update-index --skip-worktree src/environments/environment.prod.ts
```

To undo this use the ```--no-skip-worktree``` parameter:
```
git update-index --no-skip-worktree proxy.conf.json
git update-index --no-skip-worktree src/environments/environment.ts
git update-index --no-skip-worktree src/environments/environment.prod.ts
```

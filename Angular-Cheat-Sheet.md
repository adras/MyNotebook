# Adding new components
* Right-click on the Frontend-project in Visual Studio, choose Open in Terminal
* In Terminal type: ng generate component xyz

# Adding new services
E.g. for dependency injection
NOTE: "Service" will be automatically added to the name of the service which is created. e.g. ng generate service myService becomes myServiceService
* Right-click on the Frontend-project in Visual Studio, choose Open in Terminal
* In Terminal type: ng generate service heroes/hero

# Adding new packages
To install as normal package run: `npm install packagename`
To install as a dev packge run: `npm install Use npm install packagename --save-dev`

# Proxy config
Proxy config is required to access e.g. mynotebook.xx/notes
For this the proxy.conf.json is enabled, and there's a reference in angular.json to it

But to be sure the file gets used, you can use this to start the server manually
ng serve --proxy-config proxy.conf.json --verbose

make sure to stop all node.exe instances before, otherwise the port will be blocked

Note: After configuring the proxy requests are not supposed to got to the remote endpoint. They are mapped
to localhost. E.g. http://myserver/mynoteboook will be mapped to http://localhost/mynotebook, therefore
although the requests will end up being send to myserver, in your code you use localhost

# SCSS <-> CSS Migration
* Install the scss migration package as dev package: `npm install schematics-scss-migrate --save-dev`
* Do a dry run to check what's about to be changed: `ng g schematics-scss-migrate:scss-migrate --dry-run=true`
* The script will ask from which format to which you want to migrate, so it's possible to go from css->scss or from scss->css

# Updating npm packages
* Run ```npm ci``` for a clean install
* To check if packages are old run: ```npm outdated```
* To update all packages to their respected version run: ```npm update```
* NOTE: If package is referenced with a ^ in the version number the newest number will be installed
* This also resolves a lot of build and startup errors


# Install Windows
* Install node.js
* Install Chrome

Maybe also:  npm install -g @angular/cli

# Deployment
Use the developer console and run:
* npm run build-prod

Since the project is supposed to also run in a subdirectory of a server the baseHref needs to be a relative path like "./".
This however doesn't work when running the project locally, there will be an erorr like "Get / ...". To fix that, there's
no baseHref defined normally. Instead there's a "build-prod" definition in package.json which passes the baseHref parameter to 'ng build'

The API-path to the backend are defined in environment/environment.ts and environment.prod.ts. See readme.md on how to set that up

# Adding new components
* Right-click on the Frontend-project in Visual Studio, choose Open in Terminal
* In Terminal type: ng generate component xyz

# Adding new services
E.g. for dependency injection
* Right-click on the Frontend-project in Visual Studio, choose Open in Terminal
* In Terminal type: ng generate service heroes/hero

# Proxy config
Proxy config is required to access e.g. mynotebook.xx/notes
For this the proxy.conf.json is enabled, and there's a reference in angular.json to it

But to be sure the file gets used, you can use this to start the server manually
ng serve --proxy-config proxy.conf.json --verbose

make sure to stop all node.exe instances before, otherwise the port will be blocked

Note: After configuring the proxy requests are not supposed to got to the remote endpoint. They are mapped
to localhost. E.g. http://myserver/mynoteboook will be mapped to http://localhost/mynotebook, therefore
although the requests will end up being send to myserver, in your code you use localhost

# Install Windows
* Install node.js
* Install Chrome

Maybe also:  npm install -g @angular/cli

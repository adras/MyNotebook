# Overview of the components

## a-login
The login input box with it's login button and a label

## a-main
The main control which is displayed when the user is logged in. This control uses most other controls (e.g. except login).
It's toggled based on the state if the user is logged in or not. Either the login control is active or the main control

## a-logout
The logout button

## a-notes
The control containing all notes

## a-search
The search box

## a-tags
The tag selector

# MainService and components
Main.service has two kinds of methods ```onXXX``` and ```execXXX```. Whenever a request should be send to the backend
the exec methods are used. The response will be handled by a related observer which on success calls the related 
```on``` method in main.service which processes the response.

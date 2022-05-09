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

# on/do pattern
When a component has an event, the event name should start with ```on```. The methods which handle these events should
start with ```do```.

E.g. the login.component exposes the onLogin event. main.component assigns it's doLogin method to that event.

# Application workflow
## Startup
The application is started in the constructor of main.component which sends a queryAll request to the backend.
Since all responses are based on the BaseResponse, the response will contain the IsLoggedIn-flag. If the user is logged
in, the response contains all data from the user, which is bound to all components. Therefore all tags/notes will be visible.

In case the user is not logged in, queryAll will not return any data. Instead IsLoggedIn will be false.

## Login/MainView
Note: As of now, this only applies to the editor-branch - main branch has a slightly different setup

To determine wether the login or the main view should be shown, there's a binding to an IsLoggedIn property. Depending
on the property the login or the MainView are shown. This property is updated when a login/logout request are executed.

Example workflow:
1. Send a login request
2. Receive a response with IsLoggedIn=true
3. Set main.component.IsLoggedIn = true
4. When login is successful send a queryAllRequest
5. View updates, since the login/MainView binds to IsLoggedIn

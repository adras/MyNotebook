# TODO
## Main features
* Implement change settings dialog
* Implement rename/delete tag functionality
* Implement search for notes

## Bugs and improvements

* Try to find usecases where user's can lose their data. E.g. start editing note X, start edit note Y, X changes are lost
* Improve UI styling - Maybe allow the user to switch between different templates, e.g. light/dark mode
  * Checkout angular styling which is a bit different to css
  * Improve component theming. Right now each component is themed by it's own style sheet. However that style sheet should only contain a minimalistic default
    style and not the final style.
* Implement mobile phone support -> Allow for the layout to change between portrait and landscape
* Implement intelli tags -> tag suggestion when tags are typed
* Improve note-editor functionality e.g. Add bold, inverse, headings and all other stylings which can be required. Don't
  clutter it though
* Turn off all tags when allnotes tag is selected. Turn off allnotes tag when another tag is selected
* Implement support to lock UI for actions which might take some time
* Implement support for http-error handling. E.g. If the server can't be reached because of invalid url or something.
  In this case also show a proper error dialog with a retry option
* Implement support for error responses which have the error flag set. This probably means to show a dialog with error
  information. It might make sense to allow the user to try the action again
* Add dialog in case login fails
* Fix warning:"Could not find Angular Material core theme"
* Implement proper UI-state handling. 
    * E.g. If one note is being edited, what happens when edit on another note is clicked?
    * When the tag rename/edit popup is open and another action is done, the popup should hide
    * Possibly lock UI to focus user attention on the current action
* Move the wysiwyg editor to a separate component so it can be reused. Create a new note and edit note component which also features
  the edit/cancel/insert buttons - maybe just create one component for the buttons which is customizable
* https://angular.io/guide/styleguide#decorate-input-and-output-properties
* https://angular.io/guide/styleguide#dont-prefix-output-properties
  Remove on from events. Think about using *on syntax
* https://angular.io/guide/styleguide#dont-prefix-output-properties
  Update properties which are optional with ? in their declaration - Remove default values where appropriate
* Check out angular directives
* Implementing the angular-material designs and components increased the app size from ~0.6mb to ~1.2mb
  Check if this can be improved
* DONE Fix issue with special characters in notes, e.g. öä`' etc
    Works fine, when editing/creating a note, however when the page is loaded
    all special characters are messed up.
  This happened because the database used the wrong encoding which was changed in the install and upgrade scripts.
  The transport layer was fine, it happened when data was added to the database
  * RELATED DONE Investigate if there's a difference in special characters between the old and the new editor
    * Looks like the old editor replaces öä with &ouml; or &auml; - The new editor doesn't. Is this an issue?
    This should be an issue anymore. Although old special characters are stored e.g. as "&szlig;" in the database
    new special characters will be in plain unicode format
* DONE Implement create note functionality
  * DONE Update frontend with new information
    * DONE Update tags
    * DONE Add new note to view
* DONE Implement note edit functionality
  * DONE Update frontend with new information
    * DONE Update tags
    * DONE Update note text
* DONE Improve Component/mainService dependency
  Right main service is injected to each component. Therefore the components are dependant to main service. This
  makes it impossible to reuse a component without having the MainService which is a bad design since components
  should be reusable. Instead add events and properties to each component. Then main-service can register to these
  events and bind to the properties. That can be done by every other application and makes the components reusable
  ->All components now use @Input()/@Output to get and emit data from/to other components



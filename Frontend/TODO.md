# TODO
* Improve Component/mainService dependency
  Right main service is injected to each component. Therefore the components are dependant to main service. This
  makes it impossible to reuse a component without having the MainService which is a bad design since components
  should be reusable. Instead add events and properties to each component. Then main-service can register to these
  events and bind to the properties. That can be done by every other application and makes the components reusable

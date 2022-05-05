import { ALoginComponent } from "./a-login.component";
import { LoginResponse } from "./LoginResponse";

export class LoginObserver {

  constructor(private loginComponent: ALoginComponent) {
  }

  public next(loginResponse: LoginResponse) {
    this.loginComponent.isLoggedIn = loginResponse.isLoggedIn;
  }

  public error(message: string) {
    // logincomponent.showError?
  }
}

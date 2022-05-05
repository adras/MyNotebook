import { AMainServiceService } from "../a-main-service.service";
import { ALoginComponent } from "./a-login.component";
import { LoginResponse } from "./LoginResponse";

export class LoginObserver {

  constructor(private mainService: AMainServiceService) {
  }

  public next(loginResponse: LoginResponse) {
    this.mainService.isLoggedIn = loginResponse.isLoggedIn;
    console.log("After request: " + this.mainService.isLoggedIn);
  }

  public error(message: string) {
    // logincomponent.showError?
  }
}

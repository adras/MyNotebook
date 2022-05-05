import { AMainServiceService } from "../a-main-service.service";
import { ALoginComponent } from "../a-login/a-login.component";
import { AuthResponse } from "../Models/AuthResponse";

export class LoginObserver {

  constructor(private mainService: AMainServiceService) {
  }

  public next(authResponse: AuthResponse) {
    this.mainService.isLoggedIn = authResponse.isLoggedIn;
  }

  public error(message: string) {
    // logincomponent.showError?
  }
}

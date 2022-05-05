import { AuthResponse } from "../Models/AuthResponse";
import { AMainServiceService } from "../Services/a-main.service";

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

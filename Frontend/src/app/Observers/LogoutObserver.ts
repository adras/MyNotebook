import { AuthResponse } from "../Models/AuthResponse";
import { AMainServiceService } from "../Services/a-main.service";

export class LogoutObserver {

  constructor(private mainService: AMainServiceService) {
  }

  public next(authResponse: AuthResponse) {
    this.mainService.isLoggedIn = authResponse.isLoggedIn;
    console.log("After request: " + this.mainService.isLoggedIn);
  }

  public error(message: string) {
    // logincomponent.showError?
  }
}

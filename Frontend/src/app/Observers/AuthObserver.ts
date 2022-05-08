import { BaseResponse } from "../Models/BaseResponse";
import { AMainService } from "../Services/a-main.service";

export class AuthObserver {

  constructor(private mainService: AMainService) {
  }

  public next(authResponse: BaseResponse) {
    this.mainService.isLoggedIn = authResponse.isLoggedIn;

    this.mainService.onLogin(authResponse);
  }

  public error(message: string) {
    // logincomponent.showError?
  }
}

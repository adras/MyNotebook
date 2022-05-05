import { BaseResponse } from "../Models/BaseResponse";
import { AMainService } from "../Services/a-main.service";

export class AuthObserver {

  constructor(private mainService: AMainService) {
  }

  public next(authResponse: BaseResponse) {
    this.mainService.isLoggedIn = authResponse.isLoggedIn;

    // Is this ok, when this happens here?
    if (this.mainService.isLoggedIn) {
      this.mainService.onQueryAll();
    }
  }

  public error(message: string) {
    // logincomponent.showError?
  }
}

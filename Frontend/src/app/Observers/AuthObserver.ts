import { BaseResponse } from "../Models/BaseResponse";
import { AMainServiceService } from "../Services/a-main.service";

export class AuthObserver {

  constructor(private mainService: AMainServiceService) {
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

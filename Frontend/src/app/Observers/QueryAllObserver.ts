import { AuthResponse } from "../Models/AuthResponse";
import { QueryAllResponse } from "../Models/QueryAllResponse";
import { AMainServiceService } from "../Services/a-main.service";

export class QueryAllObserver {

  constructor(private mainService: AMainServiceService) {
  }

  public next(queryAllResponse: QueryAllResponse) {
    console.log("After request: " + this.mainService.isLoggedIn);
  }

  public error(message: string) {
    // logincomponent.showError?
  }
}

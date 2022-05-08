import { BaseResponse } from "../Models/BaseResponse";
import { QueryAllResponse } from "../Models/QueryAllResponse";
import { AMainService } from "../Services/a-main.service";

export class QueryAllObserver {

  constructor(private mainService: AMainService) {
  }

  public next(queryAllResponse: QueryAllResponse) {
    this.mainService.onQueryAll(queryAllResponse);
  }

  public error(message: string) {
    // logincomponent.showError?
  }
}

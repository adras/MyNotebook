import { BaseResponse } from "../Models/BaseResponse";
import { QueryAllResponse } from "../Models/QueryAllResponse";
import { AMainService } from "../Services/a-main.service";

export class QueryAllObserver {

  constructor(private mainService: AMainService) {
  }

  public next(queryAllResponse: QueryAllResponse) {
    this.mainService.isLoggedIn = queryAllResponse.isLoggedIn;
    this.mainService.allNotes = queryAllResponse.notes;
    this.mainService.allTags = queryAllResponse.tags;
    this.mainService.allSettings = queryAllResponse.settings;
  }

  public error(message: string) {
    // logincomponent.showError?
  }
}

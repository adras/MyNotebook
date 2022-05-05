import { BaseResponse } from "./BaseResponse";
import { Note } from "./Note";
import { Setting } from "./Setting";
import { Tag } from "./Tag";

export class QueryAllResponse implements BaseResponse{
  public isLoggedIn: boolean = false;
  public message: string = "";
  public result: boolean = false;

  public notes: Array<Note> = [];
  public tags: Array<Tag> = [];
  public settings: Array<Setting> = [];

  constructor() {
  }
}

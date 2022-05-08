import { BaseResponse } from "./BaseResponse";
import { Note } from "./Note";
import { Setting } from "./Setting";
import { Tag } from "./Tag";

export interface QueryAllResponse extends BaseResponse {
  isLoggedIn: boolean;
  message: string;
  result: boolean;

  notes: Array<Note>;
  tags: Array<Tag>;
  settings: Array<Setting>;

}

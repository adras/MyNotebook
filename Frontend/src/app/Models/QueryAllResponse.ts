import { BaseResponse } from "./BaseResponse";
import { Note } from "./Note";
import { Settings } from "./Settings";
import { Tag } from "./Tag";

export interface QueryAllResponse extends BaseResponse {
  isLoggedIn: boolean;
  message: string;
  result: boolean;

  notes: Array<Note>;
  tags: Array<Tag>;
  settings: Settings;
}

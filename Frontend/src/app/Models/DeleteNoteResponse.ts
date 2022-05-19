import { BaseResponse } from "./BaseResponse";
import { Note } from "./Note";
import { Tag } from "./Tag";

export interface DeleteNoteResponse extends BaseResponse {
  tags: Array<Tag>;
  note: Note;
}

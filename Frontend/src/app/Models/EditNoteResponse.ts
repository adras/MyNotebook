import { BaseResponse } from "./BaseResponse";
import { Note } from "./Note";
import { Tag } from "./Tag";

export interface EditNoteResponse extends BaseResponse {
  tags: Array<Tag>;
  note: Note;
}

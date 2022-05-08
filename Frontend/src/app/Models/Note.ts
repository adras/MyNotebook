import { Tag } from "./Tag";

export interface Note {
  id: string;
  content: string;
  tags: Array<Tag>;
  visibility: string;
}

import { Tag } from "./Tag";

export class Note {
  public id: string = "";
  public content: string = "";
  public tags: Array<Tag> = [];
  public visibility: string = "0";
}

import { Note } from "../Models/Note";

export class NoteEditorEvent {
  public noteContent: string;
  public noteId: string;
  public tags: Array<string>;

  constructor(noteContent: string, noteId: string, tags: Array<string>) {
    this.noteContent = noteContent;
    this.noteId = noteId;
    this.tags = tags;
  }
}

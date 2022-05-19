import { Note } from "../Models/Note";

export class NoteDeleteEvent {
  public noteId: string;

  constructor(noteId: string) {
    this.noteId = noteId;
  }
}

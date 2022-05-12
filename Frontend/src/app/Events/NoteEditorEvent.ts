import { Note } from "../Models/Note";

export class NoteEditorEvent {
  public note: Note;

  constructor(note: Note) {
    this.note = note;
  }
}

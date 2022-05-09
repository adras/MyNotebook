import { Note } from "../Models/Note";

export class OnEditNoteEvent {
  public note: Note;

  constructor(note: Note) {
    this.note = note;
  }
}

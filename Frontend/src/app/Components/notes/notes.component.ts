import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NoteEditorEvent } from '../../Events/NoteEditorEvent';
import { Note } from '../../Models/Note';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  @Input() selectedNotes: Array<Note> = [];
  @Output() onEditNote = new EventEmitter<NoteEditorEvent>();
  constructor() { }

  ngOnInit(): void {
    
  }
  doEditNote(event: NoteEditorEvent) {
    this.onEditNote.emit(event);
  }
}

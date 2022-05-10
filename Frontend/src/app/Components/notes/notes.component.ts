import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OnEditNoteEvent } from '../../Events/OnEditNoteEvent';
import { Note } from '../../Models/Note';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  @Input() selectedNotes: Array<Note> = [];
  @Output() onEditNote = new EventEmitter<OnEditNoteEvent>();
  constructor() { }

  ngOnInit(): void {
    
  }
  doEditNote(event: OnEditNoteEvent) {
    this.onEditNote.emit(event);
  }
}

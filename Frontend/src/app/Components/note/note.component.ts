import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OnEditNoteEvent } from '../../Events/OnEditNoteEvent';
import { OnSearch } from '../../Events/OnSearchEvent';
import { Note } from '../../Models/Note';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})

export class NoteComponent implements OnInit {
  @Input() note: Note | undefined;
  @Output() onEditNote = new EventEmitter<OnEditNoteEvent>();

  isEditing: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }


  enterEdit() {
    this.isEditing = true;
  }

  doSave(note: Note) {
    var event = new OnEditNoteEvent(note);
    this.onEditNote.emit(event);

    this.isEditing = false;
  }

  doCancel() {
    this.isEditing = false;
  }

}

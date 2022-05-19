import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NoteDeleteEvent } from '../../Events/NoteDeleteEvent';
import { NoteEditorEvent } from '../../Events/NoteEditorEvent';
import { Note } from '../../Models/Note';
import { Tag } from '../../Models/Tag';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  @Input() selectedNotes: Array<Note> = [];
  @Input() allTags: Array<Tag> = [];
  @Output() onEditNote = new EventEmitter<NoteEditorEvent>();
  @Output() onDeleteNote = new EventEmitter<NoteDeleteEvent>();
  constructor() { }

  ngOnInit(): void {
    
  }
  doEditNote(event: NoteEditorEvent) {
    this.onEditNote.emit(event);
  }

  doDeleteNote(event: NoteDeleteEvent) {
    this.onDeleteNote.emit(event);
  }
}

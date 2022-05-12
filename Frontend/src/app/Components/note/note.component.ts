import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NoteEditorEvent } from '../../Events/NoteEditorEvent';
import { OnSearch } from '../../Events/OnSearchEvent';
import { Note } from '../../Models/Note';
import { NoteEditorComponent } from '../note-editor/note-editor.component';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})

export class NoteComponent implements OnInit {
  @ViewChild(NoteEditorComponent) noteEditor: NoteEditorComponent | undefined;

  @Input() note: Note | undefined;
  @Output() onEditNote = new EventEmitter<NoteEditorEvent>();

  isEditing: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }


  enterEdit() {
    this.isEditing = true;
  }


  doSave(event: NoteEditorEvent) {
    this.onEditNote.emit(event);

    this.isEditing = false;
  }

  doCancel(event: NoteEditorEvent) {
    this.isEditing = false;
  }

}

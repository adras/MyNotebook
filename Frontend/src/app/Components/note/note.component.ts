import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NoteDeleteEvent } from '../../Events/NoteDeleteEvent';
import { NoteEditorEvent } from '../../Events/NoteEditorEvent';
import { OnSearch } from '../../Events/OnSearchEvent';
import { Note } from '../../Models/Note';
import { Tag } from '../../Models/Tag';
import { SafeHtmlPipe } from '../../SaveHtmlPipe';
import { NoteEditorComponent } from '../note-editor/note-editor.component';


@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})

export class NoteComponent implements OnInit {
  @ViewChild(NoteEditorComponent) noteEditor: NoteEditorComponent | undefined;
  @Input() allTags: Array<Tag> = [];
  @Input() note: Note | undefined;
  @Output() onEditNote = new EventEmitter<NoteEditorEvent>();
  @Output() onDeleteNote = new EventEmitter<NoteDeleteEvent>();

  isEditing: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }


  enterEdit() {
    this.isEditing = true;
  }

  deleteNote() {
    if (!confirm("Do you really want to delete the note?")) {
      return;
    }
    const event: NoteDeleteEvent = new NoteDeleteEvent(this.note!.id);
    this.onDeleteNote.emit(event);
  }

  doSave(event: NoteEditorEvent) {
    this.onEditNote.emit(event);

    this.isEditing = false;
  }

  doCancel() {
    this.isEditing = false;
  }

}

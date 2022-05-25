import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NoteEditorEvent } from '../../Events/NoteEditorEvent';
import { Note } from '../../Models/Note';
import { Tag } from '../../Models/Tag';
import { MatDialog, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.component.html',
  styleUrls: ['./new-note.component.scss']
})
export class NewNoteComponent implements OnInit {

  @Input() isVisible: boolean = false;
  @Input() allTags: Array<Tag> = [];
  @Output() onCreateNote = new EventEmitter<NoteEditorEvent>();

  note: Note = {
    id: "",
    tags: [],
    content: "",
    visibility: ""
  };

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  showDialog() {
    //this.dialog.open(MatDialog, { panelClass: 'test' });
  }

  doCancel() {
    console.log("Cancel");
    // For now, we hide here directly, but this should probably trigger an output?
    this.isVisible = false;
    this.dialog.closeAll();
  }

  doCreate(event: NoteEditorEvent) {
    console.log("Create");

    this.onCreateNote.emit(event);
    // For now, we hide here directly, but this should probably trigger an output?
    this.isVisible = false;

    this.dialog.closeAll();
  }
}


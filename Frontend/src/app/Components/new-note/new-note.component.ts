import { Component, Input, OnInit } from '@angular/core';
import { NoteEditorEvent } from '../../Events/NoteEditorEvent';
import { Note } from '../../Models/Note';

@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.component.html',
  styleUrls: ['./new-note.component.css']
})
export class NewNoteComponent implements OnInit {
  @Input() isVisible: boolean = false;

  note: Note = {
    id: "",
    tags: [],
    content: "",
    visibility: ""
  };

  constructor() { }

  ngOnInit(): void {
  }

  doCancel() {
    console.log("Cancel");

    // For now, we hide here directly, but this should probably trigger an output?
    this.isVisible = false;
  }

  doCreate(event: NoteEditorEvent) {
    console.log("Create");

    // For now, we hide here directly, but this should probably trigger an output?
    this.isVisible = false;
  }
}

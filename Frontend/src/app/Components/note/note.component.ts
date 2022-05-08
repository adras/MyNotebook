import { Component, Input, OnInit } from '@angular/core';
import { Note } from '../../Models/Note';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  @Input() note: Note | undefined;
  isEditing: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  enterEdit() {
    this.isEditing = true;
  }

  doSave() {
    this.isEditing = false;
  }

  doCancel() {
    this.isEditing = false;
  }

}

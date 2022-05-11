import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css']
})
export class CreateNoteComponent implements OnInit {
  @Output() onCreateNote = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  doClick() {
    this.onCreateNote.emit();
  }
}

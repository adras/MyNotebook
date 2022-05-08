import { Component, Input, OnInit } from '@angular/core';
import { Note } from '../../Models/Note';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  @Input() selectedNotes : Array<Note> = [];
  constructor() { }

  ngOnInit(): void {
  }

}

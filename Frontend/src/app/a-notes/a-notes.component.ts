import { Component, Input, OnInit } from '@angular/core';
import { Note } from '../Models/Note';
import { AMainService } from '../Services/a-main.service';

@Component({
  selector: 'app-a-notes',
  templateUrl: './a-notes.component.html',
  styleUrls: ['./a-notes.component.css']
})
export class ANotesComponent implements OnInit {
  @Input() selectedNotes : Array<Note> = [];
  constructor() { }

  ngOnInit(): void {
  }

}

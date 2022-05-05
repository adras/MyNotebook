import { Component, OnInit } from '@angular/core';
import { Note } from '../Models/Note';
import { AMainService } from '../Services/a-main.service';

@Component({
  selector: 'app-a-notes',
  templateUrl: './a-notes.component.html',
  styleUrls: ['./a-notes.component.css']
})
export class ANotesComponent implements OnInit {

  constructor(private mainService: AMainService) { }

  ngOnInit(): void {
  }

  notes(): Array<Note> {
    return this.mainService.allNotes;
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { Note } from '../../Models/Note';
import { Tag } from '../../Models/Tag';

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

  getTagStringFromArray(tags: Array<Tag>): string {
    // This method sucks. It would be cool to do this only with databinding
    const tagNames = tags.map(tag => tag.name);
    const allTags = tagNames.join(' ');

    return allTags;
  }

  enterEdit() {
    this.isEditing = true;
  }

  doSave() {
    this.isEditing = false;
  }

  doCancel() {
    // TODO: Since the editor is databound to the note
    // Cancel needs to undo the changes made
    this.isEditing = false;
  }

}

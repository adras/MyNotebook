import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Editor } from 'ngx-editor';
import { NoteEditorEvent } from '../../Events/NoteEditorEvent';
import { Note } from '../../Models/Note';
import { Tag } from '../../Models/Tag';

@Component({
  selector: 'app-note-editor',
  templateUrl: './note-editor.component.html',
  styleUrls: ['./note-editor.component.css']
})
export class NoteEditorComponent implements OnInit, OnDestroy {
  @Input() leftButtonText: string = "Button";
  @Input() rightButtonText: string = "Button";

  @Output() onLeftButtonClick = new EventEmitter<NoteEditorEvent>();
  @Output() onRightButtonClick = new EventEmitter<NoteEditorEvent>();

  @Input() note: Note | undefined;

  html: string = '';
  tags: Array<Tag> | undefined;


  editor!: Editor;

  ngOnInit(): void {
    this.editor = new Editor();
    this.html = this.note!.content;
    this.tags = this.note!.tags;
  }

  // make sure to destory the editor
  ngOnDestroy(): void {
    this.editor!.destroy();
  }

  doLeftButtonClick() {
    // Send the note which was bound to this component
    // It should be unchanged, otherwise it's a bug
    var event = new NoteEditorEvent(this.note!);
    this.onLeftButtonClick.emit(event);
  }

  doRightButtonClick() {
    // Create a copy of the bound note
    // Update it's content and tags and send it
    var newNote = Object.assign({}, this.note);

    // TODO: Tags missing
    newNote.content = this.html;

    var event = new NoteEditorEvent(newNote);
    this.onRightButtonClick.emit(event);
  }

}

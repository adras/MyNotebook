import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Editor } from 'ngx-editor';
import { Note } from '../../Models/Note';
import { Tag } from '../../Models/Tag';

@Component({
  selector: 'app-note-editor',
  templateUrl: './note-editor.component.html',
  styleUrls: ['./note-editor.component.css']
})
export class NoteEditorComponent implements OnInit, OnDestroy {
  @Input() note: Note | undefined;
  html: string = '';

  @Output() onCancel = new EventEmitter();
  @Output() onSave = new EventEmitter<Note>();

  editor!: Editor;

  ngOnInit(): void {
    this.editor = new Editor();
    this.html = this.note!.content;
  }

  // make sure to destory the editor
  ngOnDestroy(): void {
    this.editor!.destroy();
  }


  doSave() {
    var newNote = Object.assign({} , this.note);
    newNote.content = this.html;
    this.onSave.emit(newNote);
  }

  doCancel() {
    this.onCancel.emit();
  }
}

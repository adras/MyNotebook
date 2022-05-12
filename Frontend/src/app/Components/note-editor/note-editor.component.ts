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
  @Input() leftButtonText: string = "Button";
  @Input() rightButtonText: string = "Button";
  @Input() tags: Array<Tag> | undefined;

  @Output() onLeftButtonClick = new EventEmitter();
  @Output() onRightButtonClick = new EventEmitter();

  @Input() note: Note | undefined;
  public html: string = '';


  editor!: Editor;

  ngOnInit(): void {
    this.editor = new Editor();
    this.html = this.note!.content;
  }

  // make sure to destory the editor
  ngOnDestroy(): void {
    this.editor!.destroy();
  }



}

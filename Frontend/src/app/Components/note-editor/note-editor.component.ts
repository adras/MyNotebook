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
  @Output() onSave = new EventEmitter<string>();

  editor!: Editor;

  ngOnInit(): void {
    this.editor = new Editor();
    this.html = this.note!.content;
  }

  // make sure to destory the editor
  ngOnDestroy(): void {
    this.editor!.destroy();
  }

  getTagStringFromArray(tags: Array<Tag>): string {
    // This method sucks. It would be cool to do this only with databinding
    const tagNames = tags.map(tag => tag.name);
    const allTags = tagNames.join(' ');

    return allTags;
  }

  doSave() {
    this.onSave.emit(this.html);
  }

  doCancel() {
    this.onCancel.emit();
  }
}

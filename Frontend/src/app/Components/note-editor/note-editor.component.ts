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
  @Input() note: Note | undefined;
  @Input() allTags: Array<Tag> = [];

  @Input() leftButtonText: string = "Button";
  @Input() rightButtonText: string = "Button";

  @Output() onLeftButtonClick = new EventEmitter();
  @Output() onRightButtonClick = new EventEmitter<NoteEditorEvent>();

  html: string = '';
  tags: string[] = [];

  editor!: Editor;

  ngOnInit(): void {
    this.editor = new Editor();
    this.html = this.note!.content;
    this.tags = this.note!.tags.map(tag => tag.name);
  }

  // make sure to destory the editor
  ngOnDestroy(): void {
    this.editor!.destroy();
  }

  //getTagStringFromArray(tags: Array<Tag>): string {
  //  // This method sucks. It would be cool to do this only with databinding
  //  const tagNames = tags.map(tag => tag.name);
  //  const allTags = tagNames.join(' ');

  //  return allTags;
  //}

  doLeftButtonClick(event: string[]) {
    // event should be tags
    this.onLeftButtonClick.emit();
  }

  doRightButtonClick(event:string[]) {
    // event should be tags

    const newNoteContent = this.html;

    var newEvent = new NoteEditorEvent(newNoteContent, this.note!.id, event);
    this.onRightButtonClick.emit(newEvent);
  }

}

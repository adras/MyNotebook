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

  @Output() onLeftButtonClick = new EventEmitter();
  @Output() onRightButtonClick = new EventEmitter<NoteEditorEvent>();

  @Input() note: Note | undefined;

  html: string = '';
  tags: string | undefined;


  editor!: Editor;

  ngOnInit(): void {
    this.editor = new Editor();
    this.html = this.note!.content;
    this.tags = this.getTagStringFromArray(this.note!.tags);
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

  doLeftButtonClick(event: string) {
    this.onLeftButtonClick.emit();
  }

  doRightButtonClick(event:string) {
    // event should be tags
    const tagsArray = event.split(' ');


    // TODO: Tags missing
    const newNoteContent = this.html;

    var newEvent = new NoteEditorEvent(newNoteContent, this.note!.id, tagsArray);
    this.onRightButtonClick.emit(newEvent);
  }

}

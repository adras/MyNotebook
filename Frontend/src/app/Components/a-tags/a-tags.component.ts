import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { TagChange } from '../../Events/TagChange';
import { Tag } from '../../Models/Tag';

@Component({
  selector: 'app-a-tags',
  templateUrl: './a-tags.component.html',
  styleUrls: ['./a-tags.component.css']
})

export class ATagsComponent implements OnInit {
  @Output() tagsChanged = new EventEmitter<TagChange>();
  @Input() selectedTags: Array<string> = [];
  @Input() allTags: Array<Tag> = [];

  constructor() { }

  ngOnInit(): void {
  }

  tagChange(change: MatButtonToggleChange): void {
    const event = new TagChange(change.source.checked, change.value);
    this.tagsChanged.emit(event);
  }
}

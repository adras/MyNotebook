import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { TagChange } from '../../Events/TagChangeEvent';
import { Tag } from '../../Models/Tag';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})

export class TagsComponent implements OnInit {
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

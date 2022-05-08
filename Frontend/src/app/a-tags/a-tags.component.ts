import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { TagChange } from '../Events/TagChange';
import { Tag } from '../Models/Tag';
import { AMainService } from '../Services/a-main.service';

@Component({
  selector: 'app-a-tags',
  templateUrl: './a-tags.component.html',
  styleUrls: ['./a-tags.component.css']
})

export class ATagsComponent implements OnInit {
  @Output() tagsChanged = new EventEmitter<TagChange>();
  @Input() selectedTags: Array<string> = [];

  constructor(public mainService: AMainService) { }

  ngOnInit(): void {
  }

  tagChange(change: MatButtonToggleChange): void {
    const event = new TagChange(change.source.checked, change.value);
    this.tagsChanged.emit(event);
  }

  tags(): Array<Tag> {
    return this.mainService.allTags;
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { Tag } from '../../Models/Tag';

@Component({
  selector: 'app-tag-suggest',
  templateUrl: './tag-suggest.component.html',
  styleUrls: ['./tag-suggest.component.css']
})
export class TagSuggestComponent implements OnInit {
  @Input() tags: string | undefined;
  @Input() allTags: Array<Tag> = [];

  suggestedTags: Array<Tag> = [];
  selectedSuggestedTagIdx : number = -1;
  constructor() { }

  ngOnInit(): void {
  }

  updateSuggestions() {
    var currentInput = this.tags!.split(' ');
    var lastTag = currentInput[currentInput.length - 1];
    // If lastTag is empty, we could show all tags

    this.suggestedTags = this.allTags.filter(tag => tag.name.includes(lastTag));
  }
}

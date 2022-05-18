import { Component, Input, OnInit } from '@angular/core';
import { Tag } from '../../Models/Tag';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-tag-suggest',
  templateUrl: './tag-suggest.component.html',
  styleUrls: ['./tag-suggest.component.css']
})
export class TagSuggestComponent implements OnInit {
  @Input() tags: string | undefined;
  @Input() allTags: Array<Tag> = [];
  myControl = new FormControl();

  filteredTags!: Observable<string[]>;


  constructor() { }

  ngOnInit(): void {
    this.filteredTags = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  private _filter(tagsInput: string): string[] {
    const filterValue = tagsInput.toLowerCase();

    // Split the current text in the input box by spaces to get a list of all tags currently entered
    const tags = tagsInput.split(' ');

    // Find the last tag in the list to use it for autocomplete
    const currentTag = tags[tags.length - 1];

    const result = this.allTags.filter(tag => tag.name.toLowerCase().includes(currentTag)).map(tag => tag.name);

    return result;
  }

}

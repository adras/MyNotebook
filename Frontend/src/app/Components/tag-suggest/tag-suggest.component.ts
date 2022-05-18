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

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    const result = this.allTags.filter(tag => tag.name.toLowerCase().includes(filterValue)).map(tag => tag.name);
    const result2 = Object.assign([], result);

    const result3 = ['allnotes', 'new', 'test', 'SvenRules', 'neu', 'empty'];
    return result2;
  }

}

import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Tag } from '../../Models/Tag';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';


@Component({
  selector: 'app-tag-suggest',
  templateUrl: './tag-suggest.component.html',
  styleUrls: ['./tag-suggest.component.css']
})
export class TagSuggestComponent implements OnInit {
  @Input() tags: string | undefined;
  @Input() allTags: Array<Tag> = [];

  separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];
  fruitCtrl = new FormControl();
  filteredTags: Observable<string[]>;
  fruits: string[] = ['Lemon'];
  //allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  @ViewChild('fruitInput') fruitInput!: ElementRef<HTMLInputElement>;

  constructor() {
    this.filteredTags = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allTags.slice().map(tag => tag.name))),
    );
  }

  ngOnInit() {
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter(tag => tag.name.toLowerCase().includes(filterValue)).map(tag => tag.name);
  }
}

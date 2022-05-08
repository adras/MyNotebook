import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { OnSearch } from '../Events/OnSearch';

@Component({
  selector: 'app-a-search',
  templateUrl: './a-search.component.html',
  styleUrls: ['./a-search.component.css']
})
export class ASearchComponent implements OnInit {
  @Output() onSearch = new EventEmitter<OnSearch>();
  public searchText: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  onKeyUp(keyboardEvent: KeyboardEvent): void {
    const event = new OnSearch(this.searchText);
    this.onSearch.emit(event);
  }

}

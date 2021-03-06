import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { OnSearch } from '../../Events/OnSearchEvent';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Output() onSearch = new EventEmitter<OnSearch>();
  public searchText: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  doSearch(keyboardEvent: KeyboardEvent): void {
    const event = new OnSearch(this.searchText);
    this.onSearch.emit(event);
  }

  clearSearch() {
    this.searchText = "";
    const event = new OnSearch(this.searchText);
    this.onSearch.emit(event);
  }

}

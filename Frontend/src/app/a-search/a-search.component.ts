import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-a-search',
  templateUrl: './a-search.component.html',
  styleUrls: ['./a-search.component.css']
})
export class ASearchComponent implements OnInit {
  public searchText: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  onKeyUp(event: KeyboardEvent): void {

  }

}

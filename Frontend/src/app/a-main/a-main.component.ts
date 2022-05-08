import { Component, OnInit } from '@angular/core';
import { TagChange } from '../Events/TagChange';
import { AMainService } from '../Services/a-main.service';

@Component({
  selector: 'app-a-main',
  templateUrl: './a-main.component.html',
  styleUrls: ['./a-main.component.css']
})
export class AMainComponent implements OnInit {
  selectedTags: Array<string> = [];

  constructor(private mainService: AMainService) {
  }

  tagsChanged(change: TagChange): void {
    if (change.isChecked) {
      this.selectedTags.push(change.tagName);
    }
    else {
      // TODO: Make this an Array extension method or a helper method
      const index = this.selectedTags.indexOf(change.tagName, 0);
      if (index > -1) {
        this.selectedTags.splice(index, 1);
      }
    }
  }

  isLoggedIn(): boolean {
    return this.mainService.isLoggedIn;
  }

  ngOnInit(): void {
  }

}

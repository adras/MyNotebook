import { Component, OnInit } from '@angular/core';
import { Tag } from '../Models/Tag';
import { AMainService } from '../Services/a-main.service';

@Component({
  selector: 'app-a-tags',
  templateUrl: './a-tags.component.html',
  styleUrls: ['./a-tags.component.css']
})

export class ATagsComponent implements OnInit {

  constructor(private mainService: AMainService) { }

  ngOnInit(): void {
    // this.mainService.allSettings["defaultTags"]
  }

  tags(): Array<Tag> {
    return this.mainService.allTags;
  }
}

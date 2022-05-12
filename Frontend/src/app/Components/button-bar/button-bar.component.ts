import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tag } from '../../Models/Tag';

@Component({
  selector: 'app-button-bar',
  templateUrl: './button-bar.component.html',
  styleUrls: ['./button-bar.component.css']
})
export class ButtonBarComponent implements OnInit {
  @Input() leftButtonText: string = "Button";
  @Input() rightButtonText: string = "Button";
  @Input() tags: Array<Tag> | undefined;

  @Output() onLeftButtonClick = new EventEmitter();
  @Output() onRightButtonClick = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  doLeftButton() {
    this.onLeftButtonClick.emit();
  }

  doRightButton() {
    this.onRightButtonClick.emit();
  }


  getTagStringFromArray(tags: Array<Tag>): string {
    // This method sucks. It would be cool to do this only with databinding
    const tagNames = tags.map(tag => tag.name);
    const allTags = tagNames.join(' ');

    return allTags;
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tag } from '../../Models/Tag';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-button-bar',
  templateUrl: './button-bar.component.html',
  styleUrls: ['./button-bar.component.scss']
})
export class ButtonBarComponent implements OnInit {
  @Input() leftButtonText: string = "Button";
  @Input() rightButtonText: string = "Button";
  @Input() tags: string[] = [];
  @Input() allTags: Array<Tag> = [];

  @Output() onLeftButtonClick = new EventEmitter<string[]>();
  @Output() onRightButtonClick = new EventEmitter<string[]>();

  constructor() { }

  ngOnInit(): void {

  }

  doLeftButton() {
    this.onLeftButtonClick.emit(this.tags);
  }

  doRightButton() {
    this.onRightButtonClick.emit(this.tags);
  }


}

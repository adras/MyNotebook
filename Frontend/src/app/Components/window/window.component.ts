import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.css']
})
export class WindowComponent implements OnInit {
  @Input() isVisible: boolean = false;
  @Input() width: number = 400;
  @Input() height: number = 300;

  // These should be calculated at the start in case they are not set
  // so that the window is in the center
  @Input() left: number = 200;
  @Input() top: number = 100;


  private mouseClick: { x: number, y: number, left: number, top: number } | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  toggle() {
    this.isVisible = !this.isVisible;
  }

  doStartResizeFrom(startPosition: string) {
    this["width"]++;
  }

  //doMouseDownDrag(event: MouseEvent) {
  //  this.mouseClick = { x: event.clientX, y: event.clientY, left: this.left, top: this.top };
  //}

  //doMouseUp(event: MouseEvent) {

  //}
  //doMouseDownResize(event: MouseEvent) {
  //  event.stopPropagation();
  //}
  /*
       (mousedown)="doMouseDownDrag($event)"
       (window:mouseup)="doMouseUp($event)">
    <div class="resize-action" (mousedown)="doMouseDownResize($event)"></div> */
}

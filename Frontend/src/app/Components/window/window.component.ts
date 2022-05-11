import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ResizeStartLocations } from './ResizeStartLocations';
import { ResizeState } from './ResizeState';
import { WindowResizeService } from './windowResize.service';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.css']
})

export class WindowComponent implements OnInit {
  @Input() isVisible: boolean = false;
  @Input() width: number = 400;
  @Input() height: number = 300;

  @Input() showTitleBar: boolean = true;

  // These should be calculated at the start in case they are not set
  // so that the window is in the center
  @Input() left: number = 200;
  @Input() top: number = 100;

  resizeStartLocations = ResizeStartLocations;

  private isResizing: boolean = false;
  private isDragging: boolean = false;
  private resizeState: ResizeState | undefined;

  constructor(private resizeService: WindowResizeService) { }

  ngOnInit(): void {
  }

  toggle() {
    this.isVisible = !this.isVisible;
  }

  doStartResizeFrom(mouseEvent: MouseEvent, startPosition: ResizeStartLocations) {
    var resizeFunc = this.resizeService.getResizeFunc(startPosition);
    console.log("Resize start from: " + startPosition);

    this.resizeState = new ResizeState(mouseEvent.screenX, mouseEvent.screenY, resizeFunc);
    this.isResizing = true;
  }

  @HostListener('window:mouseup', ['$event'])
  doMouseUp(event: MouseEvent) {
    this.isResizing = false;
    this.isDragging = false;
  }

  @HostListener('window:mousemove', ['$event'])
  doMouseMove(event: MouseEvent) {
    this.doResizeMouseMove(event);
    this.doDragMouseMove(event);
  }

  doResizeMouseMove(event: MouseEvent) {
    if (!this.isResizing)
      return;

    this.resizeState?.resizeFunc(event, this, this.resizeState);
  }

  doDragMouseMove(event: MouseEvent) {
    if (!this.isDragging)
      return;
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

import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ResizeStartLocations } from './ResizeStartLocations';
import { ResizeState } from './ResizeState';
import { WindowResize } from './WindowResize';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.css']
})

export class WindowComponent implements OnInit {
  @Input() isVisible: boolean = false;
  @Input() width: number | undefined;
  @Input() height: number | undefined;
  @Input() zIndex: number | undefined;
  @Input() lockSizeToScreen: boolean = false;

  @Input() sizeWidthPercent: number = 80;
  @Input() sizeHeightPercent: number = 80;

  @Input() showTitleBar: boolean = true;

  // These should be calculated at the start in case they are not set
  // so that the window is in the center
  @Input() left: number | undefined;
  @Input() top: number | undefined;

  resizeStartLocations = ResizeStartLocations;

  private isResizing: boolean = false;
  private isDragging: boolean = false;
  private resizeState: ResizeState | undefined;

  constructor() {
  }

  ngOnInit(): void {
    if (this.zIndex === undefined) {
      this.zIndex = 1;
    }
    var screenWidth = window.innerWidth;
    var screenHeight = window.innerHeight;

    // Use a default width
    if (this.width === undefined) {
      this.width = screenWidth * this.sizeWidthPercent / 100;
    }

    // Use a default height
    if (this.height === undefined) {
      this.height = screenHeight * this.sizeHeightPercent / 100;
    }

    // Center window horizontally
    if (this.left === undefined) {
      this.left = screenWidth / 2 - this.width / 2;
    }

    // Center window vertically
    if (this.top == undefined) {
      this.top = screenHeight / 2 - this.height / 2;
    }
  }

  toggle() {
    this.isVisible = !this.isVisible;
  }

  doStartResizeFrom(mouseEvent: MouseEvent, startPosition: ResizeStartLocations) {
    var resizeFunc = WindowResize.getResizeFunc(startPosition);
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

  @HostListener('window:resize', ['$event'])
  doScreenResize(event: any) {
    if (!this.lockSizeToScreen)
      return;

    this.resizeWindowToScreen();
  }

  resizeWindowToScreen() {
    var screenWidth = window.innerWidth;
    var screenHeight = window.innerHeight;

    this.width = screenWidth * this.sizeWidthPercent / 100;
    this.height = screenHeight * this.sizeHeightPercent / 100;

    this.left = screenWidth / 2 - this.width / 2;
    this.top = screenHeight / 2 - this.height / 2;
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


}

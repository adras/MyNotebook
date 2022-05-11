import { Injectable } from '@angular/core';
import { ResizeStartLocations } from './ResizeStartLocations';
import { ResizeState } from './ResizeState';
import { WindowComponent } from './window.component';

@Injectable({
  providedIn: 'root'
})
export class WindowResizeService {
  constructor() { }

  // TODO: Figure out the return type
  public getResizeFunc(startLocation: ResizeStartLocations) {
    switch (startLocation) {
      case ResizeStartLocations.Left:
        return this.resizeFromLeft;
      case ResizeStartLocations.Right:
        return this.resizeFromRight;
      case ResizeStartLocations.Top:
        return this.resizeFromTop;
      case ResizeStartLocations.Bottom:
        return this.resizeFromBottom
      case ResizeStartLocations.TopLeft:
        return this.resizeFromTopLeft
      case ResizeStartLocations.TopRight:
        return this.resizeFromTopRight
      case ResizeStartLocations.BottomLeft:
        return this.resizeFromBottomLeft;
      case ResizeStartLocations.BottomRight:
        return this.resizeFromBottomRight;
    }
  }

  public resizeFromLeft(event: MouseEvent, window: WindowComponent, resizeState: ResizeState) {
    window.left += event.movementX;
    window.width -= event.movementX;
  }

  public resizeFromRight(event: MouseEvent, window: WindowComponent, resizeState: ResizeState) {
    window.width += event.movementX;
  }

  public resizeFromTop(event: MouseEvent, window: WindowComponent, resizeState: ResizeState) {
    window.top += event.movementY;
    window.height -= event.movementY;
  }

  public resizeFromBottom(event: MouseEvent, window: WindowComponent, resizeState: ResizeState) {
    window.height += event.movementY;
  }

  public resizeFromTopLeft(event: MouseEvent, window: WindowComponent, resizeState: ResizeState) {
    this.resizeFromLeft(event, window, resizeState);
    this.resizeFromTop(event, window, resizeState);
    console.log("I AM TOP LEFT")
  }

  public resizeFromTopRight(event: MouseEvent, window: WindowComponent, resizeState: ResizeState) {

  }
  public resizeFromBottomRight(event: MouseEvent, window: WindowComponent, resizeState: ResizeState) {

  }
  public resizeFromBottomLeft(event: MouseEvent, window: WindowComponent, resizeState: ResizeState) {

  }
}

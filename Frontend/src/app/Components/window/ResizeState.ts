import { WindowComponent } from "./window.component";

export class ResizeState {
  startX: number;
  startY: number;

  resizeFunc: (event: MouseEvent, window: WindowComponent, state: ResizeState) => void;

  constructor(startX: number, startY: number, resizeFunc: (event: MouseEvent, window: WindowComponent, state: ResizeState) => void) {
    this.startX = startX;
    this.startY = startY;
    this.resizeFunc = resizeFunc;
  }
}

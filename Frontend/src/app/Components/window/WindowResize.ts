import { ResizeStartLocations } from "./ResizeStartLocations";
import { ResizeState } from "./ResizeState";
import { WindowComponent } from "./window.component";

export class WindowResize {
  public static getResizeFunc(startLocation: ResizeStartLocations) {
    switch (startLocation) {
      case ResizeStartLocations.Left:
        return WindowResize.resizeFromLeft;
      case ResizeStartLocations.Right:
        return WindowResize.resizeFromRight;
      case ResizeStartLocations.Top:
        return WindowResize.resizeFromTop;
      case ResizeStartLocations.Bottom:
        return WindowResize.resizeFromBottom
      case ResizeStartLocations.TopLeft:
        return WindowResize.resizeFromTopLeft
      case ResizeStartLocations.TopRight:
        return WindowResize.resizeFromTopRight
      case ResizeStartLocations.BottomLeft:
        return WindowResize.resizeFromBottomLeft;
      case ResizeStartLocations.BottomRight:
        return WindowResize.resizeFromBottomRight;
    }
  }

  public static resizeFromLeft(event: MouseEvent, window: WindowComponent, resizeState: ResizeState) {
    window.left += event.movementX;
    window.width -= event.movementX;
  }

  public static resizeFromRight(event: MouseEvent, window: WindowComponent, resizeState: ResizeState) {
    window.width += event.movementX;
  }

  public static resizeFromTop(event: MouseEvent, window: WindowComponent, resizeState: ResizeState) {
    window.top += event.movementY;
    window.height -= event.movementY;
  }

  public static resizeFromBottom(event: MouseEvent, window: WindowComponent, resizeState: ResizeState) {
    window.height += event.movementY;
  }

  public static resizeFromTopLeft(event: MouseEvent, window: WindowComponent, resizeState: ResizeState) {
    WindowResize.resizeFromLeft(event, window, resizeState);
    WindowResize.resizeFromTop(event, window, resizeState);
  }

  public static resizeFromTopRight(event: MouseEvent, window: WindowComponent, resizeState: ResizeState) {
    WindowResize.resizeFromRight(event, window, resizeState);
    WindowResize.resizeFromTop(event, window, resizeState);

  }

  public static resizeFromBottomRight(event: MouseEvent, window: WindowComponent, resizeState: ResizeState) {
    WindowResize.resizeFromRight(event, window, resizeState);
    WindowResize.resizeFromBottom(event, window, resizeState);
  }

  public static resizeFromBottomLeft(event: MouseEvent, window: WindowComponent, resizeState: ResizeState) {
    WindowResize.resizeFromLeft(event, window, resizeState);
    WindowResize.resizeFromBottom(event, window, resizeState);
  }
}

import { DomSanitizer } from '@angular/platform-browser'
import { PipeTransform, Pipe } from "@angular/core";

@Pipe({ name: 'safeHtml' })
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) { }
  transform(value: any) {
    // The method name below looks really scary
    // Someone could be able to sneak in a complete html site
    // Yeah well .... :D
    // This is used for note rendering. Note contains html, and that html is assigned as innerhtml of a div
    // and voila evil stuff is rendered. Or maybe just colors. Because without this all attributes would be stripped
    // when assigning to innerHTML
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}

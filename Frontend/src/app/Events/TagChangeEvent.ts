export class TagChange {
  public isChecked: boolean;
  public tagName: string;

  constructor(isChecked: boolean, tagName: string) {
    this.isChecked = isChecked;
    this.tagName = tagName;
  }
}

declare global {
  interface Array<T> {
    remove(elem: T): Array<T>;
    clear(): void;
    contains(elemt: T): boolean;
  }
}

if (!Array.prototype.remove) {
  Array.prototype.remove = function <T>(this: T[], elem: T): T[] {
    return this.filter(e => e !== elem);
  }
}

if (!Array.prototype.clear) {
  Array.prototype.clear = function <T>(this: T[]) : void {
    // Clearing an array sucks in this language
    // To keep the original array, we just set the length to zero
    // This may have some weird side effects though
    // https://stackoverflow.com/a/1232046/7671671
    this.length = 0;
  }
}

if (!Array.prototype.contains) {
  Array.prototype.contains = function <T>(this: T[], elem: T): boolean {
    const idx = this.indexOf(elem);
    if (idx != -1)
      return true;

    return false
  }
}

export { };   

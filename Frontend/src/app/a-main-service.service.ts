import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AMainServiceService {

  constructor() { }

  public helloWorld() {
    alert("I AM SERVICE");
  }
}

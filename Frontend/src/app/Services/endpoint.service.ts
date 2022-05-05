import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EndpointService {

  constructor() { }


  public getEndpointPath() {
    const url = environment.apiURL;
    return url;
  }
}

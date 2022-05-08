import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { OnLogin } from '../Events/OnLogin';
import { BaseResponse } from '../Models/BaseResponse';
import { Note } from '../Models/Note';
import { QueryAllResponse } from '../Models/QueryAllResponse';
import { Setting } from '../Models/Setting';
import { Settings } from '../Models/Settings';
import { Tag } from '../Models/Tag';
import { EndpointService } from './endpoint.service';

@Injectable({
  providedIn: 'root'
})
export class AMainService {
  private apiPath: string;

  constructor(private http: HttpClient, private endpointService: EndpointService) {
    this.apiPath = endpointService.getEndpointPath();
  }

  public doLogin(event: OnLogin) {
    // Note: Using SHA256 to hash passwords on the client side seems to be deprecated
    // See: https://stackoverflow.com/a/43903139/7671671
    // Who cares, if the backend is rewritten everything changes anyway
    // Since it's not planned to update the backend right now, sha256 needs to be used
    //CryptoJS.SHA256()
    var shaPwd = CryptoJS.SHA256(event.password).toString();

    //var shaPwd = sha256(password).toString();

    const params = new HttpParams()
      .set("action", "login")
      .set("password", shaPwd);

    const result = this.http.post<BaseResponse>(this.apiPath, params);
    return result;
  }

  public doLogout() {

    const params = new HttpParams()
      .set("action", "logout")

    const result = this.http.post<BaseResponse>(this.apiPath, params);
    return result;
  }

  public doQueryAll() {
    const params = new HttpParams()
      .set("action", "queryAll")

    const result = this.http.post<QueryAllResponse>(this.apiPath, params);
    return result;
  }
 
}

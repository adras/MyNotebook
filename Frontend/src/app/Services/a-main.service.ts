import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as sha256 from 'crypto-js/sha256';
import { AuthResponse } from '../Models/AuthResponse';
import { AuthObserver } from '../Observers/AuthObserver';
import { QueryAllObserver } from '../Observers/QueryAllObserver';
import { EndpointService } from './endpoint.service';

@Injectable({
  providedIn: 'root'
})
export class AMainServiceService {
  private authObserver: AuthObserver;
  private queryAllObserver: QueryAllObserver;

  private apiPath: string;
  public isLoggedIn: boolean = false;

  constructor(private http: HttpClient, private endpointService: EndpointService) {
    this.authObserver = new AuthObserver(this);
    this.queryAllObserver = new QueryAllObserver(this);
    this.apiPath = endpointService.getEndpointPath();
  }

  public onLogin(password: string) {
    // Note: Using SHA256 to hash passwords on the client side seems to be deprecated
    // See: https://stackoverflow.com/a/43903139/7671671
    // Who cares, if the backend is rewritten everything changes anyway
    // Since it's not planned to update the backend right now, sha256 needs to be used

    var shaPwd = sha256(password).toString();
    console.log("ApiPath: " + this.apiPath);

    const params = new HttpParams()
      .set("action", "login")
      .set("password", shaPwd);

    this.isLoggedIn = false;

    this.http.post<AuthResponse>(this.apiPath, params).subscribe(this.authObserver);
  }

  public onLogout() {
    console.log("ApiPath: " + this.apiPath);

    const params = new HttpParams()
      .set("action", "logout")

    this.isLoggedIn = false;

    this.http.post<AuthResponse>(this.apiPath, params).subscribe(this.authObserver);
  }

  public onQueryAll() {
    const params = new HttpParams()
      .set("action", "queryAll")

    this.isLoggedIn = false;

    this.http.post<AuthResponse>(this.apiPath, params).subscribe(this.queryAllObserver);
  }
}

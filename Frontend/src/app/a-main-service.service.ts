import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginObserver } from './a-login/LoginObserver';
import * as sha256 from 'crypto-js/sha256';
import { LoginResponse } from './a-login/LoginResponse';

@Injectable({
  providedIn: 'root'
})
export class AMainServiceService {
  private loginObserver: LoginObserver;
  public isLoggedIn: boolean = false;

  constructor(private http: HttpClient) {
    this.loginObserver = new LoginObserver(this);
    console.log("Construct");
  }

  public onLogin(password: string) {
    // Note: Using SHA256 to hash passwords on the client side seems to be deprecated
    // See: https://stackoverflow.com/a/43903139/7671671
    // Who cares, if the backend is rewritten everything changes anyway
    // Since it's not planned to update the backend right now, sha256 needs to be used
    //this.mainService.helloWorld();
    var url = "http://localhost:4200/notes/index.php";
    var shaPwd = sha256(password).toString();

    const params = new HttpParams()
      .set("action", "login")
      .set("password", shaPwd)
    console.log("Before request: " + this.isLoggedIn);
    this.isLoggedIn = false;

    this.http.post<LoginResponse>(url, params).subscribe(this.loginObserver);
  }
  public onLogout() {
    var url = "http://localhost:4200/notes/index.php";

    const params = new HttpParams()
      .set("action", "logout")
    console.log("Before request: " + this.isLoggedIn);
    this.isLoggedIn = false;

    this.http.post<LoginResponse>(url, params).subscribe(this.loginObserver);
  }

}

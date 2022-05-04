import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import * as sha256 from 'crypto-js/sha256';
import { Observable } from 'rxjs';
import { LoginResponse } from './LoginResponse'

@Component({
  selector: 'app-a-login',
  templateUrl: './a-login.component.html',
  styleUrls: ['./a-login.component.css']
})


export class ALoginComponent implements OnInit {
  public password: string = "";
  //private http: HttpClient;

  constructor(private http: HttpClient) {
    //this.http = http;
  }

  ngOnInit(): void {
  }

  onLogin(): void {
    // Note: Using SHA256 to hash passwords on the client side seems to be deprecated
    // See: https://stackoverflow.com/a/43903139/7671671
    // Who cares, if the backend is rewritten everything changes anyway
    // Since it's not planned to update the backend right now, sha256 needs to be used

    var url = "http://yourserver.com/notes/index.php";
    var shaPwd = sha256(this.password).toString();

    const params = new HttpParams()
      .set("action", "login")
      .set("password", shaPwd)

    this.http.post<LoginResponse>(url, params).subscribe({
      next(loginResponse) {

      },
      error(msg) {
        console.log('Error Getting Location: ', msg);
      }
    });


  }
}

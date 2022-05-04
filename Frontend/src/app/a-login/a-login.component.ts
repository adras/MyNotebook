import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-a-login',
  templateUrl: './a-login.component.html',
  styleUrls: ['./a-login.component.css']
})
export class ALoginComponent implements OnInit {
  public password: string = "";
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  ngOnInit(): void {
  }

  onLogin(): void {
    var url = "http://yourserver.com/notes/index.php";

    var body = {
      action: "login",
      password : "test"
    }

    // POST
    // action: login
    // password: hash

    

    alert(`Your password is: '${this.password}'. Now everone can read it ;) `);
    //this.http.get(url, options);
  }
}

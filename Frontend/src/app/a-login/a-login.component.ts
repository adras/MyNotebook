import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-a-login',
  templateUrl: './a-login.component.html',
  styleUrls: ['./a-login.component.css']
})
export class ALoginComponent implements OnInit {
  public password: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  onLogin(): void {

    alert(`Your password is: '${this.password}'. Now everone can read it ;) `);
  }
}

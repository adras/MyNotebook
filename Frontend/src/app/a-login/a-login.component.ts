import { Component, OnInit } from '@angular/core';

import { AMainService } from '../Services/a-main.service';

@Component({
  selector: 'app-a-login',
  templateUrl: './a-login.component.html',
  styleUrls: ['./a-login.component.css']
})

export class ALoginComponent implements OnInit {
  public password: string = "";

  constructor(private mainService: AMainService) {
    // Query all notes, this will determine the initial state
    mainService.onQueryAll();
  }

  isLoggedIn(): boolean {
    return this.mainService.isLoggedIn;
  }

  ngOnInit(): void {
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.keyCode == 13) {
      this.onLogin();
    }
  }

  onLogin(): void {
    this.mainService.onLogin(this.password);
  }
}

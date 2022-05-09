import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { OnLoginEvent } from '../../Events/OnLoginEvent';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  @Output() onLogin = new EventEmitter<OnLoginEvent>();

  constructor() {
  }

  ngOnInit(): void {
  }

  execLogin(password: string): void {
    const event = new OnLoginEvent(password);
    this.onLogin.emit(event);
  }

  onKeyPress(event: KeyboardEvent, password:string): void {
    if (event.keyCode == 13) {
      this.execLogin(password);
    }
  }
}

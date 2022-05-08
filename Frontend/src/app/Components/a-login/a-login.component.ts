import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { OnLogin } from '../../Events/OnLogin';


@Component({
  selector: 'app-a-login',
  templateUrl: './a-login.component.html',
  styleUrls: ['./a-login.component.css']
})

export class ALoginComponent implements OnInit {
  @Output() onLogin = new EventEmitter<OnLogin>();

  constructor() {
  }

  ngOnInit(): void {
  }

  execLogin(password: string): void {
    const event = new OnLogin(password);
    this.onLogin.emit(event);
  }

  onKeyPress(event: KeyboardEvent, password:string): void {
    if (event.keyCode == 13) {
      this.execLogin(password);
    }
  }
}

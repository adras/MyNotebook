import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  @Output() onLogout = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  execLogout(): void {
    this.onLogout.emit();
  }
}

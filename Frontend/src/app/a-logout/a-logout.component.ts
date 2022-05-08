import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AMainService } from '../Services/a-main.service';

@Component({
  selector: 'app-a-logout',
  templateUrl: './a-logout.component.html',
  styleUrls: ['./a-logout.component.css']
})
export class ALogoutComponent implements OnInit {
  @Output() onLogout = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  execLogout(): void {
    this.onLogout.emit();
  }
}

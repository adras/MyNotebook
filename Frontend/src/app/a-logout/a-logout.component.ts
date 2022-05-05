import { Component, OnInit } from '@angular/core';
import { AMainService } from '../Services/a-main.service';

@Component({
  selector: 'app-a-logout',
  templateUrl: './a-logout.component.html',
  styleUrls: ['./a-logout.component.css']
})
export class ALogoutComponent implements OnInit {

  constructor(private mainService: AMainService) {
  }

  ngOnInit(): void {
  }

  onLogout(): void {
    this.mainService.onLogout();
  }

}

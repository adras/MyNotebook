import { Component, OnInit } from '@angular/core';
import { AMainServiceService } from '../a-main-service.service';

@Component({
  selector: 'app-a-logout',
  templateUrl: './a-logout.component.html',
  styleUrls: ['./a-logout.component.css']
})
export class ALogoutComponent implements OnInit {

  constructor(private mainService: AMainServiceService) {
  }

  ngOnInit(): void {
  }

  onLogout(): void {
    this.mainService.onLogout();
  }

}

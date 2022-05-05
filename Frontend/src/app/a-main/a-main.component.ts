import { Component, OnInit } from '@angular/core';
import { AMainServiceService } from '../a-main-service.service';

@Component({
  selector: 'app-a-main',
  templateUrl: './a-main.component.html',
  styleUrls: ['./a-main.component.css']
})
export class AMainComponent implements OnInit {

  constructor(private mainService: AMainServiceService) {
  }

  isLoggedIn(): boolean {
    return this.mainService.isLoggedIn;
  }

  ngOnInit(): void {
  }

}

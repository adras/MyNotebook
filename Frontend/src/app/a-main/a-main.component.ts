import { Component, OnInit } from '@angular/core';
import { AMainService } from '../Services/a-main.service';

@Component({
  selector: 'app-a-main',
  templateUrl: './a-main.component.html',
  styleUrls: ['./a-main.component.css']
})
export class AMainComponent implements OnInit {

  constructor(private mainService: AMainService) {
  }

  isLoggedIn(): boolean {
    return this.mainService.isLoggedIn;
  }

  ngOnInit(): void {
  }

}

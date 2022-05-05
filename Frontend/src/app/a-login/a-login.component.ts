import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { LoginObserver } from '../Observers/LoginObserver';
import { AuthResponse } from '../Models/AuthResponse'
import { AMainServiceService } from '../Services/a-main.service';

@Component({
  selector: 'app-a-login',
  templateUrl: './a-login.component.html',
  styleUrls: ['./a-login.component.css']
})


export class ALoginComponent implements OnInit {
  public password: string = "";

  constructor(private mainService: AMainServiceService) {
  }

  isLoggedIn(): boolean {
    console.log("IsLoggedInProperty: " + this.mainService.isLoggedIn);
    
    return this.mainService.isLoggedIn;
  }

  ngOnInit(): void {
  }

  onLogin(): void {
    this.mainService.onLogin(this.password);
  }
}

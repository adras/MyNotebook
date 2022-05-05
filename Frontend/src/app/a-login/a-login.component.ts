import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { AMainServiceService } from '../a-main-service.service';
import { LoginObserver } from './LoginObserver';
import { LoginResponse } from './LoginResponse'

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
    return this.mainService.isLoggedIn;
  }

  ngOnInit(): void {
  }

  onLogin(): void {
    this.mainService.onLogin(this.password);
  }
}

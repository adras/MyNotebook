import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { BaseResponse } from '../Models/BaseResponse';
import { Note } from '../Models/Note';
import { QueryAllResponse } from '../Models/QueryAllResponse';
import { Setting } from '../Models/Setting';
import { Tag } from '../Models/Tag';
import { AuthObserver } from '../Observers/AuthObserver';
import { QueryAllObserver } from '../Observers/QueryAllObserver';
import { EndpointService } from './endpoint.service';

@Injectable({
  providedIn: 'root'
})
export class AMainService {
  private authObserver: AuthObserver;
  private queryAllObserver: QueryAllObserver;
  private apiPath: string;

  // Note data
  public allNotes: Array<Note> = [];
  public allTags: Array<Tag> = [];
  public allSettings: Array<Setting> = [];

  // States
  public selectedTags: Array<string> = [];

  public isLoggedIn: boolean = false;

  constructor(private http: HttpClient, private endpointService: EndpointService) {
    this.authObserver = new AuthObserver(this);
    this.queryAllObserver = new QueryAllObserver(this);
    this.apiPath = endpointService.getEndpointPath();
  }

  public visibleNotes(): Array<Note> {
    return this.allNotes;
  }

  // Requests - move to dedicated file
  public execLogin(password: string) {
    // Note: Using SHA256 to hash passwords on the client side seems to be deprecated
    // See: https://stackoverflow.com/a/43903139/7671671
    // Who cares, if the backend is rewritten everything changes anyway
    // Since it's not planned to update the backend right now, sha256 needs to be used
    //CryptoJS.SHA256()
    var shaPwd = CryptoJS.SHA256(password).toString();
    
    //var shaPwd = sha256(password).toString();

    console.log("ApiPath: " + this.apiPath);

    const params = new HttpParams()
      .set("action", "login")
      .set("password", shaPwd);

    this.isLoggedIn = false;

    this.http.post<BaseResponse>(this.apiPath, params).subscribe(this.authObserver);
  }

  public execLogout() {
    console.log("ApiPath: " + this.apiPath);

    const params = new HttpParams()
      .set("action", "logout")

    this.isLoggedIn = false;

    this.http.post<BaseResponse>(this.apiPath, params).subscribe(this.authObserver);
  }

  public execQueryAll() {
    const params = new HttpParams()
      .set("action", "queryAll")

    this.http.post<QueryAllResponse>(this.apiPath, params).subscribe(this.queryAllObserver);
  }

  // Request-Response actions
  public onQueryAll(response: QueryAllResponse) {
    this.isLoggedIn = response.isLoggedIn;
    if (!this.isLoggedIn) {
      return;
    }
    this.allNotes = response.notes;
    this.allTags = response.tags;
    this.allSettings = response.settings;



    const defaultTags = response.settings.filter(x => x.name == "defaultTags");

    this.selectedTags = defaultTags.map(tag => tag.name);
  }

  public onLogin(response: BaseResponse) {
    this.isLoggedIn = response.isLoggedIn;
    if (this.isLoggedIn) {
      this.execQueryAll();
    }
  }

  public onLogout(response: BaseResponse) {
  }
}

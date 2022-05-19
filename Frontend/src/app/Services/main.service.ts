import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { NoteDeleteEvent } from '../Events/NoteDeleteEvent';
import { NoteEditorEvent } from '../Events/NoteEditorEvent';
import { OnLoginEvent } from '../Events/OnLoginEvent';
import { BaseResponse } from '../Models/BaseResponse';
import { CreateNoteResponse } from '../Models/CreateNoteResponse';
import { DeleteNoteResponse } from '../Models/DeleteNoteResponse';
import { EditNoteResponse } from '../Models/EditNoteResponse';
import { Note } from '../Models/Note';
import { QueryAllResponse } from '../Models/QueryAllResponse';
import { EndpointService } from './endpoint.service';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  private apiPath: string;

  constructor(private http: HttpClient, private endpointService: EndpointService) {
    this.apiPath = endpointService.getEndpointPath();
  }

  public doLogin(event: OnLoginEvent) {
    // Note: Using SHA256 to hash passwords on the client side seems to be deprecated
    // See: https://stackoverflow.com/a/43903139/7671671
    // Who cares, if the backend is rewritten everything changes anyway
    // Since it's not planned to update the backend right now, sha256 needs to be used
    //CryptoJS.SHA256()
    var shaPwd = CryptoJS.SHA256(event.password).toString();

    //var shaPwd = sha256(password).toString();

    const params = new HttpParams()
      .set("action", "login")
      .set("password", shaPwd);

    const result = this.http.post<BaseResponse>(this.apiPath, params);
    return result;
  }

  public doLogout() {

    const params = new HttpParams()
      .set("action", "logout")

    const result = this.http.post<BaseResponse>(this.apiPath, params);
    return result;
  }

  public doQueryAll() {
    const params = new HttpParams()
      .set("action", "queryAll")

    const result = this.http.post<QueryAllResponse>(this.apiPath, params);
    return result;
  }

  public doEditNote(event: NoteEditorEvent) {
    // PHP Backend does not accept a tag array, instead it's a string of tags separated by spaces
    // Working code
    const tagString = event.tags.join(' ');
    var note = ({
      id: event.noteId,
      content: event.noteContent,
      tags: tagString
    });

    // TODO: There was a bug where tags were send as an array which was encapsulated with quotes and therefore interpreted by
    // the backend as string and not array. This needs to be investigated at one point, because the tag-handling in the backend
    // is quite cumbersome at the moment

    const params = new HttpParams()
      .set("action", "editNote")
      .set("note", JSON.stringify(note));

    const result = this.http.post<EditNoteResponse>(this.apiPath, params);
    return result;
  }

  public doDeleteNote(event: NoteDeleteEvent) {

    var note = ({
      id: event.noteId,
      content: "",
      tags: ""
    });

    const params = new HttpParams()
      .set("action", "deleteNote")
      .set("note", JSON.stringify(note));

    const result = this.http.post<DeleteNoteResponse>(this.apiPath, params);
    return result;
  }

  public doCreateNote(event: NoteEditorEvent) {
    // PHP Backend does not accept a tag array, instead it's a string of tags separated by spaces
    // Working code
    const tagString = event.tags.join(' ');
    var note = ({
      content: event.noteContent,
      tags: tagString
    });

    // TODO: There was a bug where tags were send as an array which was encapsulated with quotes and therefore interpreted by
    // the backend as string and not array. This needs to be investigated at one point, because the tag-handling in the backend
    // is quite cumbersome at the moment

    const params = new HttpParams()
      .set("action", "newNote")
      .set("note", JSON.stringify(note));

    const result = this.http.post<CreateNoteResponse>(this.apiPath, params);
    return result;
  }

}

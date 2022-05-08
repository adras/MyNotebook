import { Component, OnInit } from '@angular/core';
import { OnLogin } from '../../Events/OnLoginEvent';
import { TagChange } from '../../Events/TagChangeEvent';
import { BaseResponse } from '../../Models/BaseResponse';
import { Note } from '../../Models/Note';
import { QueryAllResponse } from '../../Models/QueryAllResponse';
import { Settings } from '../../Models/Settings';
import { Tag } from '../../Models/Tag';
import { MainService } from '../../Services/main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  // Note data
  allNotes: Array<Note> = [];
  allTags: Array<Tag> = [];
  allSettings: Settings | undefined;

  // States
  selectedTags: Array<string> = [];
  isLoggedIn: boolean = false;
  selectedNotes: Array<Note> = [];

  constructor(private mainService: MainService) {
  }

  ngOnInit(): void {
  }

  tagsChanged(change: TagChange): void {
    if (change.isChecked) {
      this.selectedTags.push(change.tagName);
    }
    else {
      // TODO: Make this an Array extension method or a helper method
      const index = this.selectedTags.indexOf(change.tagName, 0);
      if (index > -1) {
        this.selectedTags.splice(index, 1);
      }
    }
    this.updateSelectedNotes();
  }

  updateSelectedNotes(): void {
    
    var test = this.allNotes[10].tags.map((tag) => tag.name);
    console.log(test);
    //this.selectedNotes = this.allNotes.filter((note) => note.tags.map((tag) => tag.name).);
    //this.selectedNotes = this.allNotes.filter(
    //  (note) => this.selectedTags.includes(note.tags.map(tag => tag.name)))

    this.selectedNotes.splice(0, this.selectedNotes.length);
    for (var i = 0; i < this.allNotes.length; i++) {
      for (var j = 0; j < this.allNotes[i].tags.length; j++) {
        if (this.selectedTags.includes(this.allNotes[i].tags[j].name)) {
          this.selectedNotes.push(this.allNotes[i]);
          break;
        }
      }
    }
  }

  doLogin(event: OnLogin) {
    this.mainService.doLogin(event).subscribe((response: BaseResponse) => this.onLogin(response));
  }

  doLogout() {
    this.mainService.doLogout().subscribe((response) => this.onLogout(response));
  }

  doQueryAll() {
    this.mainService.doQueryAll().subscribe((response: QueryAllResponse) => this.onQueryAll(response));
  }

  // Response methods
  public onQueryAll(response: QueryAllResponse) {
    this.isLoggedIn = response.isLoggedIn;
    if (!this.isLoggedIn) {
      return;
    }
    this.allNotes = response.notes;
    this.allTags = response.tags;
    this.allSettings = response.settings;   

    // value in Settings is defined as string, however for defaultTags it's an array
    // Casting the string directly to an array would result in an error, therefore we cast to unknown first
    this.selectedTags = this.allSettings.defaultTags.value as unknown as Array<string>;

    this.updateSelectedNotes();
  }

  public onLogin(response: BaseResponse) {
    this.isLoggedIn = response.isLoggedIn;
    if (this.isLoggedIn) {
      this.doQueryAll();
    }
  }

  public onLogout(response: BaseResponse) {
    this.isLoggedIn = response.isLoggedIn;
  }
}

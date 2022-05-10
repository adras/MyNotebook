import { Component, OnInit } from '@angular/core';
import { OnEditNoteEvent } from '../../Events/OnEditNoteEvent';
import { OnLoginEvent } from '../../Events/OnLoginEvent';
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
    this.doQueryAll();
  }

  ngOnInit(): void {
  }

  doTagsChanged(change: TagChange): void {
    console.log("Tag change: " + change.tagName + " " + change.isChecked);
    // We require some casts since we consider these values to be never undefined
    const allNotesTagName = this.allSettings?.allNotesTagName.value as string;
    const isAllNotesTag = allNotesTagName == change.tagName;
    const defaultSelectedTags = this.allSettings?.defaultTags.value as unknown as string[];

    // Check if the selected tag is the allNotes tag
    if (isAllNotesTag) {
      if (change.isChecked == true) {
        // Allnotes tag was selected
        // Clear all selected tags
        this.selectedTags.splice(0, this.selectedTags.length);

        // Add all notes tag
        this.selectedTags.push(allNotesTagName);
      }
      else {
        // AllNotes was deselected
        // Clear all selected tags
        this.selectedTags.splice(0, this.selectedTags.length);

        // Add default tags
        this.selectedTags.push(...defaultSelectedTags);
      }
      this.updateSelectedNotes();
      return;
    }

    const allNoteTagIdx = this.selectedTags.indexOf(allNotesTagName)
    if (allNoteTagIdx != -1) {
      this.selectedTags.splice(allNoteTagIdx, 1);
    }

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
    // If allnotes tag is selected, show all notes
    const allNotesTag = this.allSettings?.allNotesTagName.value as string;
    if (this.selectedTags.includes(allNotesTag)) {
      this.selectedNotes = Object.assign([], this.allNotes);
      return;
    }

    // Show all notes which contain one of the selected tags
    // There should be a more modern way to do this
    this.selectedNotes.splice(0, this.selectedNotes.length);
    for (var i = 0; i < this.allNotes.length; i++) {
      for (var j = 0; j < this.allNotes[i].tags.length; j++) {
        if (this.selectedTags.includes(this.allNotes[i].tags[j].name)) {
          this.selectedNotes.push(this.allNotes[i]);
          break;
        }
      }
    }

    // TODO, search selectedNotes for searchText? could also be done in the loop above
    // Figure out what's faster

  }

  doEditNote(event: OnEditNoteEvent) {

  }

  doLogin(event: OnLoginEvent) {
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

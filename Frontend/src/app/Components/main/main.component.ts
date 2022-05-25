import { Component, OnInit, ViewChild } from '@angular/core';
import { NoteDeleteEvent } from '../../Events/NoteDeleteEvent';
import { NoteEditorEvent } from '../../Events/NoteEditorEvent';
import { OnLoginEvent } from '../../Events/OnLoginEvent';
import { OnSearch } from '../../Events/OnSearchEvent';
import { TagChange } from '../../Events/TagChangeEvent';
import { BaseResponse } from '../../Models/BaseResponse';
import { CreateNoteResponse } from '../../Models/CreateNoteResponse';
import { DeleteNoteResponse } from '../../Models/DeleteNoteResponse';
import { EditNoteResponse } from '../../Models/EditNoteResponse';
import { Note } from '../../Models/Note';
import { QueryAllResponse } from '../../Models/QueryAllResponse';
import { Settings } from '../../Models/Settings';
import { Tag } from '../../Models/Tag';
import { MainService } from '../../Services/main.service';
import { NewNoteComponent } from '../new-note/new-note.component';
import { WindowComponent } from '../window/window.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @ViewChild(NewNoteComponent) newNote: NewNoteComponent | undefined;

  // Note data
  allNotes: Array<Note> = [];
  allTags: Array<Tag> = [];
  allSettings: Settings | undefined;

  // States
  selectedTags: Array<string> = [];
  isLoggedIn: boolean = false;
  selectedNotes: Array<Note> = [];
  searchText: string = "";

  // TODO: There are now Array-Extensions in /Extensions/ArrayExtensions these can be used
  // To simplify a few places here

  constructor(private mainService: MainService) {
    this.doQueryAll();
  }

  ngOnInit(): void {
  }


  doTagsChanged(change: TagChange): void {
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
      // TODO: Figure out why this is
      // For some reason, the databinding doesn't work properly, when
      // just splicing and pushing the array
      // Therefore we reassign it, which fixes that

      this.selectedTags = Object.assign([], this.selectedTags);
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

    // TODO: Figure out why this is
    // For some reason, the databinding doesn't work properly, when
    // just splicing and pushing the array
    // Therefore we reassign it, which fixes that
    this.selectedTags = Object.assign([], this.selectedTags);
    this.updateSelectedNotes();
  }

  doSearch(event: OnSearch) {
    // Actual search will be performed by updateSelectedNotes();
    this.searchText = event.searchText.toLowerCase().trim();
    this.updateSelectedNotes();
  }

  updateSelectedNotes(): void {
    // Stupid extension doesn't work
    // this.selectedNotes.clear();
    this.selectedNotes.length = 0;

    const allNotesTag = this.allSettings?.allNotesTagName.value as string;
    const allNotesSelected = this.selectedTags.indexOf(allNotesTag) != -1;
    for (var i = 0; i < this.allNotes.length; i++) {
      const currentNote = this.allNotes[i];
      if (allNotesSelected ||
        currentNote.tags.map(tag => tag.name)
          .some(tagName => this.selectedTags.includes(tagName))) {
        // Either allNotes tag is selected, or the note has one of the selected tag

        // Check if note contains the search text, continue if not
        if (currentNote.content.toLowerCase().indexOf(this.searchText) == -1) {
          continue;
        }

        // Add <mark> tags around the text found in the note
        // Could also use Pipes for this: https://stackoverflow.com/questions/44961759/highlight-the-search-text-angular-2
        var regex = "(>?)(" + this.searchText + ")([^>]*<)";
        var replace = "$1<mark class=\"search-text\">$2</mark>$3";

        var newNote = Object.assign([], currentNote);
        newNote.content = newNote.content.replace(new RegExp(regex, "gi"), replace);

        this.selectedNotes.push(newNote);
      }
    }
  }

  doShowCreateNote() {
    this.newNote!.isVisible = !this.newNote!.isVisible;
  }

  doCreateNote(event: NoteEditorEvent) {
    // Note: It might be required to unsubscribe from these observables to avoid memory leaks

    this.mainService.doCreateNote(event).subscribe((response: CreateNoteResponse) => this.onCreateNote(response));
  }

  doEditNote(event: NoteEditorEvent) {
    this.mainService.doEditNote(event).subscribe((response: EditNoteResponse) => this.onEditNote(response));
  }

  doDeleteNote(event: NoteDeleteEvent) {
    this.mainService.doDeleteNote(event).subscribe((response: DeleteNoteResponse) => this.onDeleteNote(response));
  }

  doLogin(event: OnLoginEvent) {
    var request = this.mainService.doLogin(event).subscribe(
      (response: BaseResponse) => this.onLogin(response), (error: any) => alert("oh noes: " + error), () => alert("Wohoooz"));

  }

  doLogout() {
    this.mainService.doLogout().subscribe((response) => this.onLogout(response));
  }

  doQueryAll() {
    this.mainService.doQueryAll().subscribe((response: QueryAllResponse) => this.onQueryAll(response));
  }

  // Response methods
  onQueryAll(response: QueryAllResponse) {
    this.isLoggedIn = response.isLoggedIn;
    if (!this.isLoggedIn) {
      return;
    }
    this.allNotes = response.notes;
    this.allTags = response.tags;
    this.allSettings = response.settings;

    // value in Settings is defined as string, however for defaultTags it's an array
    // Casting the string directly to an array would result in an error, therefore we cast to unknown first
    const defaultTags = this.allSettings.defaultTags.value as unknown as Array<string>;

    this.selectedTags = Object.assign([], defaultTags);;

    this.updateSelectedNotes();
  }

  onLogin(response: BaseResponse) {
    this.isLoggedIn = response.isLoggedIn;
    if (this.isLoggedIn) {
      this.doQueryAll();
    }
  }

  onLogout(response: BaseResponse) {
    this.isLoggedIn = response.isLoggedIn;
  }

  onEditNote(response: EditNoteResponse) {
    var noteIdx = this.allNotes.findIndex(note => note.id == response.note.id);
    if (noteIdx == -1) {
      // This should never happen since the id of the note reported from the backend also should exist in the
      // frontend
      console.log("Error: Edited a note with an id that doesn't exist in the frontent");
      return;
    }
    // Replace old note with new one
    this.allNotes[noteIdx] = response.note;

    // Update tags
    this.allTags = response.tags;

    // Update view
    this.updateSelectedNotes();
  }

  onDeleteNote(response: DeleteNoteResponse) {
    this.allNotes = this.allNotes.filter(note => note.id != response.note.id);
    this.updateSelectedNotes();
  }

  onCreateNote(response: CreateNoteResponse) {
    // Insert new note
    this.allNotes.splice(0, 0, response.note);

    // Update tags
    this.allTags = response.tags;

    // Update view
    this.updateSelectedNotes();
  }
}

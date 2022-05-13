import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
//import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';


import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { LogoutComponent } from './Components/logout/logout.component';
import { NotesComponent } from './Components/notes/notes.component';
import { SearchComponent } from './Components/search/search.component';
import { TagsComponent } from './Components/tags/tags.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MainComponent } from './Components/main/main.component';
import { NoteComponent } from './Components/note/note.component';
import { NgxEditorModule } from 'ngx-editor';
import { NoteEditorComponent } from './Components/note-editor/note-editor.component';
import { NewNoteComponent } from './Components/new-note/new-note.component';
import { WindowComponent } from './Components/window/window.component';
import { CreateNoteComponent } from './Components/create-note/create-note.component';
import { ButtonBarComponent } from './Components/button-bar/button-bar.component';
import { EditNoteComponent } from './Components/edit-note/edit-note.component';
import { TagSuggestComponent } from './Components/tag-suggest/tag-suggest.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    NotesComponent,
    SearchComponent,
    TagsComponent,
    MainComponent,
    NoteComponent,
    NoteEditorComponent,
    NewNoteComponent,
    WindowComponent,
    CreateNoteComponent,
    ButtonBarComponent,
    EditNoteComponent,
    TagSuggestComponent
  
  ],
  imports: [
    BrowserModule,
    FormsModule, // Required for [(ngModel)] bindings
    HttpClientModule,
    MatButtonToggleModule,
    NgxEditorModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

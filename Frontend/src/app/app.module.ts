import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { LogoutComponent } from './Components/logout/logout.component';
import { NotesComponent } from './Components/notes/notes.component';
import { SearchComponent } from './Components/search/search.component';
import { TagsComponent } from './Components/tags/tags.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SafeHtmlPipe } from './SaveHtmlPipe';

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
    TagSuggestComponent,
    SafeHtmlPipe
  ],
  imports: [
    BrowserModule,
    FormsModule, // Required for [(ngModel)] bindings
    ReactiveFormsModule, // Required for FormsModule
    HttpClientModule,
    MatButtonToggleModule,
    NgxEditorModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    BrowserAnimationsModule,
    FlexLayoutModule 
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

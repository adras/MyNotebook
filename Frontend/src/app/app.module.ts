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


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    NotesComponent,
    SearchComponent,
    TagsComponent,
    MainComponent
  
  ],
  imports: [
    BrowserModule,
    FormsModule, // Required for [(ngModel)] bindings
    HttpClientModule,
    MatButtonToggleModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

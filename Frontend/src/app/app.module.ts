import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
//import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';


import { AppComponent } from './app.component';
import { ALoginComponent } from './Components/a-login/a-login.component';
import { HttpClientModule } from '@angular/common/http';
import { ALogoutComponent } from './Components/a-logout/a-logout.component';
import { ANotesComponent } from './Components/a-notes/a-notes.component';
import { ASearchComponent } from './Components/a-search/a-search.component';
import { ATagsComponent } from './Components/a-tags/a-tags.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { AMainComponent } from './Components/a-main/a-main.component';


@NgModule({
  declarations: [
    AppComponent,
    ALoginComponent,
    ALogoutComponent,
    ANotesComponent,
    ASearchComponent,
    ATagsComponent,
    AMainComponent
  
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

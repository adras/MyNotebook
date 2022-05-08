import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
//import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';


import { AppComponent } from './app.component';
import { ALoginComponent } from './a-login/a-login.component';
import { HttpClientModule } from '@angular/common/http';
import { ALogoutComponent } from './a-logout/a-logout.component';
import { ANotesComponent } from './a-notes/a-notes.component';
import { ASearchComponent } from './a-search/a-search.component';
import { ATagsComponent } from './a-tags/a-tags.component';
import { AMainComponent } from './a-main/a-main.component';
import { MatButtonToggle, MatButtonToggleModule } from '@angular/material/button-toggle';


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

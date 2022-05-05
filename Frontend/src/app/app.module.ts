import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ALoginComponent } from './a-login/a-login.component';
import { HttpClientModule } from '@angular/common/http';
import { ALogoutComponent } from './a-logout/a-logout.component';
import { ANotesComponent } from './a-notes/a-notes.component';
import { ASearchComponent } from './a-search/a-search.component';
import { ATagsComponent } from './a-tags/a-tags.component';

@NgModule({
  declarations: [
    AppComponent,
    ALoginComponent,
    ALogoutComponent,
    ANotesComponent,
    ASearchComponent,
    ATagsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, // Required for [(ngModel)] bindings
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

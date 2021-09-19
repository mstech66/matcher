import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { MatchComponent } from './match/match.component';
import { DragDropDirective } from './drag-drop.directive';
import { MatTableModule, MatProgressBarModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MatchComponent,
    DragDropDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatProgressBarModule
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }

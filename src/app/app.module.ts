import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CronometroComponent } from './components/cronometro/cronometro.component';
import { HeaderComponent } from './components/header/header.component';
import { ParticipanteComponent } from './components/participante/participante.component';

@NgModule({
  declarations: [
    AppComponent,
    CronometroComponent,
    HeaderComponent,
    ParticipanteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

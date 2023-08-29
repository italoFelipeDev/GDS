import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CronometroComponent } from './components/cronometro/cronometro.component';
import { HeaderComponent } from './components/header/header.component';
import { ParticipanteComponent } from './components/participante/participante.component';
import { ListaParticipantesComponent } from './components/lista-participantes/lista-participantes.component';
import { ParticipanteLocutorComponent } from './components/participante-locutor/participante-locutor.component';
import { DailyDisplayComponent } from './components/daily-display/daily-display.component';

@NgModule({
  declarations: [
    AppComponent,
    CronometroComponent,
    HeaderComponent,
    ParticipanteComponent,
    ListaParticipantesComponent,
    ParticipanteLocutorComponent,
    DailyDisplayComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

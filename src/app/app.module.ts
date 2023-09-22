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
import { LoginUsuarioComponent } from './components/login-usuario/login-usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CadastroProjetoComponent } from './components/cadastro-projeto/cadastro-projeto.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ProjetoComponent } from './components/projeto/projeto.component';
import { ListaProjetosComponent } from './components/lista-projetos/lista-projetos.component'
@NgModule({
  declarations: [
    AppComponent,
    CronometroComponent,
    HeaderComponent,
    ParticipanteComponent,
    ListaParticipantesComponent,
    ParticipanteLocutorComponent,
    DailyDisplayComponent,
    LoginUsuarioComponent,
    CadastroProjetoComponent,
    NavbarComponent,
    HomeComponent,
    ProjetoComponent,
    ListaProjetosComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

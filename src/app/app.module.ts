import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CronometroComponent } from './components/reuniao-componentes/cronometro/cronometro.component';
import { ParticipanteComponent } from './components/reuniao-componentes/participante/participante.component';
import { ListaParticipantesComponent } from './components/reuniao-componentes/lista-participantes/lista-participantes.component';
import { ParticipanteLocutorComponent } from './components/reuniao-componentes/participante-locutor/participante-locutor.component';
import { DailyDisplayComponent } from './components/reuniao-componentes/daily-display/daily-display.component';
import { LoginUsuarioComponent } from './components/usuario-componentes/login-usuario/login-usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CadastroProjetoComponent } from './components/home-componentes/cadastro-projeto/cadastro-projeto.component';
import { NavbarComponent } from './components/util/navbar/navbar.component';
import { HomeComponent } from './components/home-componentes/home/home.component';
import { ProjetoComponent } from './components/home-componentes/projeto/projeto.component';
import { ListaProjetosComponent } from './components/home-componentes/lista-projetos/lista-projetos.component';
import { ProjetoViewComponent } from './components/projeto-componentes/projeto-view/projeto-view.component';
import { CadastrarImpedimentoComponent } from './components/projeto-componentes/cadastrar-impedimento/cadastrar-impedimento.component';
import { ImpedimentoComponent } from './components/util/impedimento/impedimento.component';
import { PerfilComponent } from './components/usuario-componentes/perfil/perfil.component';
import { CadastroFaltaComponent } from './components/projeto-componentes/cadastro-falta/cadastro-falta.component';
import { ListaFaltaComponent } from './components/util/lista-falta/lista-falta.component';
import { FaltaComponent } from './components/util/falta/falta.component';
import { ListaImpedimentoComponent } from './components/util/lista-impedimento/lista-impedimento.component';
import { ToastComponent } from './components/util/toast/toast.component';
import { AnotacaoComponent } from './components/util/anotacao/anotacao.component';
import { DailyReviewComponent } from './components/reuniao-componentes/daily-review/daily-review.component';
import { RegistroDailyComponent } from './components/registro-daily/registro-daily.component';
import { ListaRegistroDailyComponent } from './components/relatorio-componentes/lista-registro-daily/lista-registro-daily.component';
import { RelatorioComponent } from './components/relatorio-componentes/relatorio/relatorio.component';
import { RelatorioViewComponent } from './components/relatorio-componentes/relatorio-view/relatorio-view.component';
import { ListaParticipanteProjetoComponent } from './components/projeto-componentes/lista-participante-projeto/lista-participante-projeto.component';
import { CadastroParticipanteProjetoComponent } from './components/projeto-componentes/cadastro-participante-projeto/cadastro-participante-projeto.component';
@NgModule({
  declarations: [
    AppComponent,
    CronometroComponent,
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
    ProjetoViewComponent,
    CadastrarImpedimentoComponent,
    ImpedimentoComponent,
    PerfilComponent,
    CadastroFaltaComponent,
    ListaFaltaComponent,
    FaltaComponent,
    ListaImpedimentoComponent,
    ToastComponent,
    AnotacaoComponent,
    DailyReviewComponent,
    RegistroDailyComponent,
    ListaRegistroDailyComponent,
    RelatorioComponent,
    RelatorioViewComponent,
    ListaParticipanteProjetoComponent,
    CadastroParticipanteProjetoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

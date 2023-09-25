import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DailyDisplayComponent } from './components/daily-display/daily-display.component';
import { LoginUsuarioComponent } from './components/login-usuario/login-usuario.component';
import { HomeComponent } from './components/home/home.component';
import { CadastroProjetoComponent } from './components/cadastro-projeto/cadastro-projeto.component';

const routes: Routes = [
  {component:DailyDisplayComponent,path:'display'},
  {component:LoginUsuarioComponent, path:'login'},
  {component: HomeComponent,path:'home/:id'},
  {component: CadastroProjetoComponent,path:'cadastro/projeto/:id'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

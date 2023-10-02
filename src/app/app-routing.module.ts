import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DailyDisplayComponent } from './components/daily-display/daily-display.component';
import { LoginUsuarioComponent } from './components/login-usuario/login-usuario.component';
import { HomeComponent } from './components/home/home.component';
import { CadastroProjetoComponent } from './components/cadastro-projeto/cadastro-projeto.component';
import { ProjetoViewComponent } from './components/projeto-view/projeto-view.component';

const routes: Routes = [
  {component:DailyDisplayComponent,path:'projeto/:id/daily'},
  {component:LoginUsuarioComponent, path:''},
  {component: HomeComponent, path:'home'},
  {component: CadastroProjetoComponent,path:'cadastro/projeto'},
  {component: ProjetoViewComponent,path:'projeto/:id'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DailyDisplayComponent } from './components/daily-display/daily-display.component';
import { LoginUsuarioComponent } from './components/login-usuario/login-usuario.component';

const routes: Routes = [
  {component:DailyDisplayComponent,path:'display'},
  {component:LoginUsuarioComponent, path:'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

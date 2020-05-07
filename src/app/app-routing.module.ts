import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: './pages/home/home.module#HomePageModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: './pages/login/login.module#LoginPageModule',
    canActivate: [LoginGuard],
  },
  {
    path: 'cadastro',
    loadChildren: './pages/cadastro/cadastro.module#CadastroPageModule',
    canActivate: [LoginGuard],
  },
  {
    path: 'home/tabs/champions/champion/:id',
    canActivate: [AuthGuard],
    loadChildren:
      './pages/home/champions/champion/champion.module#ChampionPageModule',
  },
  {
    path: 'home/tabs/builds/build-modelling',
    canActivate: [AuthGuard],
    loadChildren:
      './pages/home/builds/build-modelling/build-modelling.module#BuildModellingPageModule',
  },
  { path: 'build-edit', loadChildren: './pages/home/builds/build-edit/build-edit.module#BuildEditPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

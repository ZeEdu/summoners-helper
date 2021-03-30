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
    path: 'home/tabs/builds/build-modelling',
    canActivate: [AuthGuard],
    loadChildren:
      './pages/home/builds/build-modelling/build-modelling.module#BuildModellingPageModule',
  },
  {
    path: 'home/tabs/builds/build-edit/:id',
    canActivate: [AuthGuard],
    loadChildren:
      './pages/home/builds/build-edit/build-edit.module#BuildEditPageModule',
  },
  {
    path: 'home/tabs/builds/build-view/:id',
    canActivate: [AuthGuard],
    loadChildren:
      './pages/home/builds/build-view/build-view.module#BuildViewPageModule',
  },
  {
    path: 'guide/:id',
    canActivate: [AuthGuard],
    loadChildren:
      './pages/home/champions/champion/guide/guide.module#GuidePageModule',
  },
  {
    path: 'recover-password',
    canActivate: [LoginGuard],
    loadChildren:
      './pages/recover-password/recover-password.module#RecoverPasswordPageModule',
  },
  {
    path: 'delete-account',
    canActivate: [AuthGuard],
    loadChildren:
      './pages/home/settings/delete-account/delete-account.module#DeleteAccountPageModule',
  },
  {
    path: 'change-password',
    canActivate: [AuthGuard],
    loadChildren:
      './pages/home/settings/change-password/change-password.module#ChangePasswordPageModule',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

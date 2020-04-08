import { NgModule } from '@angular/core';
import { RouterModule, Router, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: HomePage,
    children: [
      {
        path: 'builds',
        loadChildren: './builds/builds.module#BuildsPageModule',
      },
      {
        path: 'champions',
        loadChildren: './champions/champions.module#ChampionsPageModule',
      },
      {
        path: 'settings',
        loadChildren: './settings/settings.module#SettingsPageModule',
      },
    ],
  },
  {
    path: 'home',
    redirectTo: '/home/tabs/settings',
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class HomeRoutingModule {}

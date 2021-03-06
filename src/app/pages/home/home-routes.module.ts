import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
        path: 'champions/:id',
        loadChildren: './champions/champion/champion.module#ChampionPageModule',
      },
      {
        path: 'champions/:id/:guideid',
        loadChildren: './champions/champion/guide/guide.module#GuidePageModule',
      },
      {
        path: 'settings',
        loadChildren: './settings/settings.module#SettingsPageModule',
      },
    ],
  },
  {
    path: 'home',
    redirectTo: '/home/tabs/builds',
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class HomeRoutingModule {}

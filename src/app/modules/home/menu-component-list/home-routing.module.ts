import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
     {
        path: 'home',
        loadChildren: () => import('../../home/menu-component-list/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'data-business',
        loadChildren: () => import('../data-business/data-business.module').then(m => m.DataBusinessPageModule)
      },
      {
        path: 'data-business1',
        loadChildren: () => import('../data-business/data-business.module').then(m => m.DataBusinessPageModule)
      },
      {
        path: 'formula-business',
        loadChildren: () => import('../formula-business/formula-business.module').then(m => m.FormulaBusinessPageModule)
      },
      {
        path: 'login',
        loadChildren: () => import('../../auth/login/login.module').then(m => m.LoginPageModule)
      },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }

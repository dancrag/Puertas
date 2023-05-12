import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DataBusinessPage } from './data-business.page';

const routes: Routes = [
  {
    path: '',
    component: DataBusinessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, ],
})
export class DataBusinessPageRoutingModule {}

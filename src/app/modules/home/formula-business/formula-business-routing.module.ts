import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormulaBusinessPage } from './formula-business.page';

const routes: Routes = [
  {
    path: '',
    component: FormulaBusinessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, ],
})
export class DataBusinessPageRoutingModule {}

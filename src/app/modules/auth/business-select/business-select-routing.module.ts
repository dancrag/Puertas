import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusinessSelectPage } from './business-select.page';

const routes: Routes = [
  {
    path: '',
    component: BusinessSelectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrationPageRoutingModule {}

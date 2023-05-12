import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { DataBusinessPageRoutingModule } from './formula-business-routing.module';
import { FormulaBusinessPage } from './formula-business.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    DataBusinessPageRoutingModule,
  ],
  declarations: [
    FormulaBusinessPage,
  ],
  exports: [
  ],
})
export class FormulaBusinessPageModule {}

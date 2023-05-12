import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { DataBusinessPageRoutingModule } from './data-business-routing.module';
import { DataBusinessPage } from './data-business.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    DataBusinessPageRoutingModule,
  ],
  declarations: [
    DataBusinessPage,
    //BusinessHeaderComponent
  ],
  exports: [
  ],
})
export class DataBusinessPageModule {}

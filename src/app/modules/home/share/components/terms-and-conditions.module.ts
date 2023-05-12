import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';


import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';

@NgModule({
  declarations: [TermsAndConditionsComponent,
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[TermsAndConditionsComponent],
})
export class TermsAndConditionsModule { }

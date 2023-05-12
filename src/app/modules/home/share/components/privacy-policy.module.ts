import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';


import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
@NgModule({
  declarations: [PrivacyPolicyComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[PrivacyPolicyComponent],
})
export class PrivacyPolicyModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RegistrationPageRoutingModule } from './registration-routing.module';
import { RegistrationPage } from './registration.page';
import { PrivacyPolicyModule } from '../../home/share/components/privacy-policy.module';
import { TermsAndConditionsModule } from '../../home/share/components/terms-and-conditions.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrationPageRoutingModule,
    ReactiveFormsModule,
    PrivacyPolicyModule,
    TermsAndConditionsModule
  ],
  declarations: [RegistrationPage]
})
export class RegistrationPageModule {}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';


import CustomValidators from './custom.validators';
import { AuthService } from '../../auth/services/auth.service';
import { DataService } from '../../home/share/services/data.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  registration!: FormGroup;

  // Form fields

  get name() {
    return this.registration && this.registration.get('name') || null;
  }
  get first_family_name() {
    return this.registration && this.registration.get('first_family_name') || null;
  }
  get dob() {
    return this.registration && this.registration.get('dob') || null;
  }
  get email() {
    return this.registration && this.registration.get('email') || null;
  }
  get password() {
    return this.registration && this.registration.get('password') || null;
  }
  get password_confirm() {
    return this.registration && this.registration.get('password_confirm') || null;
  }
  get agreement() {
    return this.registration && this.registration.get('agreement') || null;
  }

  // Form controls
  isSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router,
    public dataService: DataService
  ) {}

  ngOnInit() {
    this.registration = this.fb.group(
      {
        name: ['', [Validators.required, Validators.maxLength(90)]],
        first_family_name: ['', [Validators.required, Validators.maxLength(90)]],
        dob: [null, [Validators.required, Validators.nullValidator]],
        email: ['', [Validators.required, Validators.email, Validators.maxLength(250)]],
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
        password_confirm: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
        agreement: [false, [Validators.requiredTrue]],
        isAdmin: [this.dataService.isAdmin]
      },
      {
        validators: [CustomValidators.match('password', 'password_confirm')],
      }
    );
    this.registration.valueChanges.subscribe( () => { this.isSubmitted = false; });
  }

  async back() {
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }

  async register() {
    console.log(this.registration.value);
    this.isSubmitted = true;
    console.log("this.registration", this.registration);
    if (!this.registration.valid) {
      console.log("******INVALID FORM*******");
      return;
    }
    //const loading = await this.loadingController.create();
    //await loading.present();

    const user = await this.authService.register(this.registration.value, this.dataService.isAdmin);
    //await loading.dismiss();

    if (user) {
      this.router.navigateByUrl('/email-verification', { replaceUrl: true });
    } else {
      this.showAlert('', 'Registro erroneo');
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}

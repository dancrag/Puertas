import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.page.html',
  styleUrls: ['./email-verification.page.scss'],
})
export class EmailVerificationPage implements OnInit {

  constructor(
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
  }

  async resendEmailVerification() {
    //const loading = await this.loadingController.create();
    //await loading.present();

    const resend = await this.authService.resendEmailVerification();
    //await loading.dismiss();

    if (resend) {
      this.showAlert('', 'Correo de verificación enviado')
    } else {
      this.showAlert('', 'Error enviando correo de verificación')
    }
  }

  async logout() {
    //const loading = await this.loadingController.create();
    //await loading.present();

    await this.authService.logout();
    //await loading.dismiss();

    this.router.navigateByUrl('/', { replaceUrl: true});
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

import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { DataService } from '../share/services/data.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  //correo del usuario
  //ownerName?: string = this.auth.currentUser?.email!;
  ownerName?: string = this.dataService.ownerName;

  constructor(
    private loadingController: LoadingController,
    private authService: AuthService,
    //private auth: Auth,
    private router: Router,
    public dataService: DataService
  ) {}

  ngOnInit() {

  }

  async logout() {
    console.log("hacia home...");
    //const loading = await this.loadingController.create();
    //await loading.present();

    //await this.authService.logout();
    //await loading.dismiss();

    this.router.navigateByUrl('/login', { replaceUrl: true});
  }


}

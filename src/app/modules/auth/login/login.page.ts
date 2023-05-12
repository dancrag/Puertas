import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { CatalogsService } from 'src/app/modules/home/share/services/catalogs.service';
import { DataService } from '../../home/share/services/data.service';


interface BusinessElementData {
  data: BusinessElement[];
  message: string;
  success: boolean;
}

interface BusinessElement {
  id: any;
}




@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials!: FormGroup;
  //respuesta servicio de negocio
  businessElem?: BusinessElementData;
  //bandera que indica si es un registro de admin
  isAdmin: boolean = false;
  //bandera que indica si existe el perfil
  existProfile: boolean = false;

  usuarios: any =[{
    name: 'Pedro',
    lastName: 'Martinez Gomez',
    rol: 'EMPALME',
    age: 54,
    password: 'usuario1',
    email: 'p.martinez@puertas-madera.com'
  },
  {
    name: 'Andres',
    lastName: 'Villar Perez',
    rol: 'ARMADO',
    age: 32,
    password: 'usuario2',
    email: 'a.villar@puertas-madera.com'
   }];

   foundUser: boolean = false;

  constructor( 
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private router: Router,
    private catalogService: CatalogsService,
    private dataService: DataService
  ) { }

  // Form fields
  get email() {
    return this.credentials && this.credentials.get('email') || null;
  }
  get password() {
    return this.credentials && this.credentials.get('password') || null;
  }

  // Form controls
  isSubmitted = false;

  ngOnInit() {
    //validar la url y verificar si es administrador
    console.log("Current Nav...", this.router.url);
    if (this.router.url == '/login/admin') {
      this.isAdmin = true;
      this.dataService.isAdmin = true;
    } else {
      this.isAdmin = false;
      this.dataService.isAdmin = false;
    }

    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.credentials.valueChanges.subscribe( () => { this.isSubmitted = false; })
  }

  async register() {
    if (this.isAdmin) {
      this.router.navigateByUrl('/registration/admin', { replaceUrl: true});
    } else {
      this.router.navigateByUrl('/registration', { replaceUrl: true});
    }
    
  }

  async login() {

    this.isSubmitted = true;
    if (!this.credentials.valid) {
      return;
    }
    //const loading = await this.loadingController.create();
    //await loading.present();

    console.log(this.credentials.value);
    this.credentials.value.email
    this.credentials.value.password

    this.usuarios.forEach((element: any) => {
        console.log(element);
        if (this.credentials.value.email == element.email && 
          this.credentials.value.password == element.password) {
            this.foundUser = true;
            this.dataService.ownerName = element.name;
            this.router.navigateByUrl('/home', { replaceUrl: true});
        }
    });

    if (!this.foundUser) {
      this.showAlert('', 'Usuario / password invalido');
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

  onMouseEnter(hoverName: HTMLElement) {
    hoverName.style.fontWeight = "bold";
  }

  onMouseOut(hoverName: HTMLElement) {
    hoverName.style.fontWeight = "normal";
  }

}

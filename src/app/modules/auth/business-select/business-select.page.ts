import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { CatalogsService } from 'src/app/modules/home/share/services/catalogs.service';
import { Auth } from '@angular/fire/auth';
import { DataService } from '../../home/share/services/data.service';
//import { Storage } from '@ionic/storage-angular';


interface BusinessElementData {
  data: BusinessElement[];
  message: string;
  success: boolean;
}

interface BusinessElement {
  name: string;
  imagePath: string;
  id: any;
}

@Component({
  selector: 'business-select',
  templateUrl: './business-select.page.html',
  styleUrls: ['./business-select.page.scss'],
})
export class BusinessSelectPage implements OnInit {
  @Output()
  businessSelected = new EventEmitter<string>();
  
  businessForm!: FormGroup;
  owner?: string = this.auth.currentUser?.uid;
  //objeto para almacenar el businessID
  businessObj: any;
  //lista de tipos negocio
  businessTypeList: any = [];
  businessElem?: BusinessElementData;

  // Form fields

  get businessType() {
    return this.businessForm && this.businessForm.get('businessType') || null;
  }

  // Form controls
  isSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private auth: Auth,
    private router: Router,
    private catalogsService: CatalogsService,
    //private storage: Storage
    private dataService: DataService
  ) {}

  ngOnInit() {

    console.log("Owner", this.owner);
    //obtenemos los negocios de la persona firmada
    this.catalogsService.getAllBusiness(this.owner).subscribe(data => {
      this.businessTypeList = [];  
      console.log(data);
      const resp = JSON.stringify(data);
      this.businessElem = JSON.parse(resp);
      //se crea la lista
      this.businessElem!.data.forEach(value => {
        this.businessTypeList.push({
          id: value.id,
          name: value.name,
          img: value.imagePath ? value.imagePath:'https://ionicframework.com/docs/img/demos/avatar.svg'
        });
      });

    });

    this.businessForm = this.fb.group(
      {
        businessType: [null, [Validators.required, Validators.nullValidator]],
      }
    );

    this.businessForm.valueChanges.subscribe( () => { this.isSubmitted = false; });
  }

  async back() {
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }



  async next() {
    console.log("entrando a next");
    //const loading = await this.loadingController.create();
    //await loading.present();
    this.isSubmitted = true;

    console.log(this.businessForm.value);
    console.log(this.businessForm);

    if (!this.businessForm.valid) {
      console.log("***** NO ES VALIDO ******");
      //loading.dismiss();
      return;
    }

    console.log("Enviando negocio", this.businessObj);
    this.businessSelected.emit(this.businessObj.id);

    const params: NavigationExtras = {
      queryParams: {business: this.businessObj},
      replaceUrl: true
    };

    this.dataService.selectedBusinessId = this.businessObj.id;
    this.dataService.ownerId = this.owner != null ? this.owner : '';
    //this.storage['set']('business-key', this.businessObj);

    //loading.dismiss();
    this.router.navigateByUrl('/home', params);

  }

  //obtener el negocio seleccionado
  public onChange(event: any){
    console.log('what did I get?', event);
    this.businessObj = event;
  }

}

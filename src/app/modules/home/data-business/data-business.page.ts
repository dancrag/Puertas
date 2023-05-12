import { Component, OnInit, Input } from '@angular/core';
import { PopoverController, LoadingController, AlertController } from '@ionic/angular';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { CatalogsService } from 'src/app/modules/home/share/services/catalogs.service';
import { DataService } from '../share/services/data.service';


interface AddressResponse {
  data: Address[];
  message: string;
  success: boolean;
}

interface Address {
  city: string;
  municipality: string;
  postalCode: string;
  settlementType: string;
  state: string;
}

@Component({
  selector: 'app-data-business',
  templateUrl: './data-business.page.html',
  styleUrls: ['./data-business.page.scss'],
})
export class DataBusinessPage implements OnInit {
  businessForm!: FormGroup;

  // Form controls
  isSubmitted = false;
  descripcion: any;
  //tiempo del timmer de cp
  timeout: any = null;
  //modo consulta
  consulta: any;
  //lista de tipos negocio
  businessTypeList: any = [];
  //lista ciudades
  citiesList: any = [];
  //lista municipio
  municipalityList: any = [];
  //lista colonias
  colList: any = [];
  //direccion
  address?: AddressResponse;
  //bandera para editar formulario
  @Input() editForm: boolean = false;
  //dias de no trabajo seleccionados
  selectedDays: any = {
    Lunes: false,
    Martes: false,
    Miercoles: false,
    Jueves: false,
    Viernes: false,
    Sabado: false,
    Domingo: false
  }

  selected = {
    'background-color': '#122349',
    'color': '#f0f8ff'
  }
  normal = {
    'background-color': '#b9e3ea',
    'color': '#122349'
  }

  constructor(private fb: FormBuilder,
    private popoverCtrl: PopoverController,
    private catalogsService: CatalogsService,
    private loadingController: LoadingController,
    private router: Router,
    private dataService: DataService,
    private alertController: AlertController
  ) {

    router.events.subscribe((val) => {
      if (val instanceof NavigationStart) {
        console.log("Iniciando la carga business-data");
        console.log(val.url);
        if (val.url == '/home/data-business') {
          console.log("ejecutando on init");
          this.ngOnInit();
        }
      }
    });

  }

  ngOnInit() {

    //Se llenan los tipos de negocio
    this.catalogsService.getbusinessType().subscribe(data => {
      this.businessTypeList = data.data;
      console.log("this.businessTypeList", this.businessTypeList);
    });


    //cuando ya existe un negocio seleccionado
    if (this.dataService.selectedBusinessId) {
      console.log("****si existe el negocio****");
      this.catalogsService.getBusinessDataById(this.dataService.ownerId, this.dataService.selectedBusinessId).
        subscribe((data: any) => {
          console.log("Response getBusinessDataById", data);
          this.editForm = true;
          this.fillForm(data.data);
        });
    }


    console.log('*****Se inicia datos-negocio******');
    this.editForm = false;
    this.inicializateForm();

    this.businessForm.valueChanges.subscribe(() => { this.isSubmitted = false; });

  }
/*
  async changeNegocio(ev: any) {

    const popover = await this.popoverCtrl.create({
      component: ChangeBusinessPopoverComponent,
      event: ev,
      translucent: true
    });

    await popover.present();

    const { data } = await popover.onWillDismiss();
    console.log(data);

  }
*/

  get businessName() {
    return this.businessForm && this.businessForm.get('businessName') || null;
  }

  get businessType() {
    return this.businessForm && this.businessForm.get('businessType') || null;
  }

  get businessDescription() {
    return this.businessForm && this.businessForm.get('businessDescription') || null;
  }

  get city() {
    return this.businessForm && this.businessForm.get('city') || null;
  }

  get municipality() {
    return this.businessForm && this.businessForm.get('municipality') || null;
  }

  get zipCode() {
    return this.businessForm && this.businessForm.get('zipCode') || null;
  }

  get phone() {
    return this.businessForm && this.businessForm.get('phone') || null;
  }

  get intNumb() {
    return this.businessForm && this.businessForm.get('intNumb') || null;
  }

  get extNumb() {
    return this.businessForm && this.businessForm.get('extNumb') || null;
  }

  get street() {
    return this.businessForm && this.businessForm.get('street') || null;
  }

  get col() {
    return this.businessForm && this.businessForm.get('col') || null;
  }

  get days() {
    return this.businessForm && this.businessForm.get('arrayDias') || null;
  }

  get inicioLunes() {
    return this.businessForm && this.businessForm.get('inicioLunes') || null;
  }


  async upsertBusiness() {
    //const loading = await this.loadingController.create();
    //await loading.present();
    console.log("guardando usauri", this.dataService.ownerId);
    //cuando guarda
    if (!this.editForm) {
      this.isSubmitted = true;
      console.log(this.businessForm.value);
      console.log(this.businessForm);

      if (!this.businessForm.valid) {
        console.log("***** NO ES VALIDO ******");
        //loading.dismiss();
        return;
      }

      const data = await this.catalogsService.getCoodinates(this.businessForm.value).toPromise();
      console.log(data);
      const resp = JSON.stringify(data);
      const obj = JSON.parse(resp);
      const coordinates = obj.results[0].geometry.location.lng + ', ' + obj.results[0].geometry.location.lat
      this.businessForm.controls['location'].setValue(coordinates);

      if (this.dataService.selectedBusinessId) {
        //actualizamos
        console.log("actualizar negocio..........");
        console.log("this.businessForm.value", this.businessForm.value);
        this.catalogsService.updateBusinessData(this.businessForm.value, this.dataService.ownerId).subscribe(data => {
          console.log("Actualizar response", data);
        });
      } else {
        //guardamos
        console.log("guardar negocio..........");
        this.catalogsService.saveBusinessData(this.businessForm.value, this.dataService.ownerId).subscribe((data: any) => {
          console.log("Guardar response", data);
          this.dataService.selectedBusinessId = data.data.id.id;
          this.businessForm.controls['idBusiness'].setValue(data.data.id.id);
        });
      }

      this.editForm = true;
      this.disableForm();
      //loading.dismiss();
    } else {
      //cuando actualiza
      console.log("Editando formulario");
      //this.editForm = false;
      //this.enableForm();
      //loading.dismiss();
    }

  }

  changeMunicipio(evento: any) {
    //TODO
  }

  getTipoNegocio(e: any) {
    console.log('El tipo de negocio seleccionado es ', e);
    this.businessForm.controls['businessType'].setValue(e);
  }

  getEntidad(e: any) {
    console.log('La entidad seleccionada es ', e);
  }

  getMunicipio(e: any) {
    console.log('El municipio seleccionado es ', e);
  }

  openLoadLogo(ev: any) {
    console.log('abrir modal ');
  }


  //busca el codigo postal
  onKeySearchZipCode(event: any) {

    clearTimeout(this.timeout);
    var $this = this;
    this.timeout = setTimeout(function () {
      if (event.keyCode != 13) {
        $this.callZipCodeService(event.target.value);
      }
    }, 1000);

  }

  async callZipCodeService(value: string) {
    //const loading = await this.loadingController.create();
    //await loading.present();

    this.catalogsService.getZipCode(value).subscribe(data => {
      const resp = JSON.stringify(data);
      this.address = JSON.parse(resp);
      console.log("addressResponse", this.address);

      this.colList = [];
      this.municipalityList = [];
      this.citiesList = [];

      this.address?.data.forEach((element, i) => {
        this.colList.push({ id: element.settlementType/*`${i}`*/, name: element.settlementType });
        this.municipalityList.push({ id: this.address?.data[i].municipality/*`${i}`*/, name: this.address?.data[i].municipality });
        this.citiesList.push({ id: this.address?.data[i].city/*`${i}`*/, name: this.address?.data[i].city });
      });

      console.log("this.colList", this.colList);
      console.log("this.citiesList", this.citiesList);
      console.log("this.municipalityList", this.municipalityList);

    });

    //loading.dismiss();
  }

  //actualiza la lista de dias
  onCheckChange(valor: any, day: string, inicial: string) {
    this.selectedDays[day] = !valor
    const formArray: FormArray = this.businessForm.get('days') as FormArray;
    formArray.controls.forEach((ctrl: any, i: number) => {
      if (ctrl.value.weekdayDescription == day) {
        // Remove the unselected element from the arrayForm
        formArray.controls[i].patchValue(
          {
            'weekday': inicial,
            'weekdayDescription': day,
            'work': this.selectedDays[day]
          }
        );
        return;
      }
    });
  }

  //llena un formulario a partir del negocio consultado
  fillForm(data: any) {
  

    console.log("data", data);

    this.callZipCodeService(data.postalCode);
    this.businessForm = this.fb.group(
      {
        idBusiness: [data.id],
        businessName: [{ value: data.name, disabled: this.editForm }, [Validators.required, Validators.nullValidator]],
        businessType: [{ value: { id: Number(data.businessTypeId), name: '' }, disabled: this.editForm }, [Validators.required, Validators.nullValidator]],
        businessDescription: [{ value: data.description, disabled: this.editForm }, [Validators.required, Validators.nullValidator]],
        city: [{ value: { id: data.federalEntity, name: data.federalEntity }, disabled: this.editForm }, [Validators.required, Validators.nullValidator]],
        phone: [{ value: data.phone, disabled: this.editForm }],
        zipCode: [{ value: data.postalCode, disabled: this.editForm }, [Validators.required, Validators.nullValidator]],
        intNumb: [{ value: data.interiorNumber, disabled: this.editForm }, [Validators.required, Validators.nullValidator]],
        extNumb: [{ value: data.outdoorNumber, disabled: this.editForm }, [Validators.required, Validators.nullValidator]],
        col: [{ value: { id: data.cologne, name: data.cologne }, disabled: this.editForm }, [Validators.required, Validators.nullValidator]],
        street: [{ value: data.street, disabled: this.editForm }, [Validators.required, Validators.nullValidator]],
        municipality: [{ value: { id: data.municipality, name: data.municipality }, disabled: this.editForm }, [Validators.required, Validators.nullValidator]],
        instagram: [{ value: data.instagram, disabled: this.editForm }],
        webPage: [{ value: data.webPage, disabled: this.editForm }],
        facebook: [{ value: data.facebook, disabled: this.editForm }],
        location: [{ value: data.location, disabled: this.editForm }],
        inicioLunes: ['1994-03-12T' + this.getDaysHour(true, 'Lunes', data) + ':00'],
        finLunes: ['1994-03-12T' + this.getDaysHour(false, 'Lunes', data) + ':00'],
        inicioViernes: ['1994-03-12T' + this.getDaysHour(true, 'Viernes', data) + ':00'],
        finViernes: ['1994-03-12T' + this.getDaysHour(false, 'Viernes', data) + ':00'],
        inicioJueves: ['1994-03-12T' + this.getDaysHour(true, 'Jueves', data) + ':00'],
        finJueves: ['1994-03-12T' + this.getDaysHour(false, 'Jueves', data) + ':00'],
        inicioMiercoles: ['1994-03-12T' + this.getDaysHour(true, 'Miercoles', data) + ':00'],
        finMiercoles: ['1994-03-12T' + this.getDaysHour(false, 'Miercoles', data) + ':00'],
        inicioMartes: ['1994-03-12T' + this.getDaysHour(true, 'Martes', data) + ':00'],
        finMartes: ['1994-03-12T' + this.getDaysHour(false, 'Martes', data) + ':00'],
        inicioSabado: ['1994-03-12T' + this.getDaysHour(true, 'Sabado', data) + ':00'],
        finSabado: ['1994-03-12T' + this.getDaysHour(false, 'Sabado', data) + ':00'],
        inicioDomingo: ['1994-03-12T' + this.getDaysHour(true, 'Domingo', data) + ':00'],
        finDomingo: ['1994-03-12T' + this.getDaysHour(false, 'Domingo', data) + ':00'],
        showBusiness: data.businessApplication,
        days: new FormArray([
          new FormControl({ 'weekday': 'L', 'weekdayDescription': 'Lunes', 'work': false }),
          new FormControl({ 'weekday': 'M', 'weekdayDescription': 'Martes', 'work': false }),
          new FormControl({ 'weekday': 'M', 'weekdayDescription': 'Miercoles', 'work': false }),
          new FormControl({ 'weekday': 'J', 'weekdayDescription': 'Jueves', 'work': false }),
          new FormControl({ 'weekday': 'V', 'weekdayDescription': 'Viernes', 'work': false }),
          new FormControl({ 'weekday': 'S', 'weekdayDescription': 'Sabado', 'work': false }),
          new FormControl({ 'weekday': 'D', 'weekdayDescription': 'Domingo', 'work': false }),
        ])
      }
    );

    console.log("businessForm", this.businessForm.value);

  }

  //funcion para obtener las horas dependiendo del dia
  getDaysHour(start: boolean, day: string, data: any) {
    let dayHour = '';
    data.hourHand.forEach((elem: any) => {
      if (day == elem.weekday) {
        this.selectedDays[elem.weekday] = true;//elem.active;
        if (start) {
          dayHour = elem.start;
        } else {
          dayHour = elem.end;
        }
      }
    });
    return dayHour;
  }

  //compara listas en selects
  compareWith(o1: any, o2: any) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  //se inicializa el form
  inicializateForm() {
    this.businessForm = this.fb.group(
      {
        idBusiness: [''],
        businessName: [{ value: '', disabled: this.editForm }, [Validators.required, Validators.nullValidator]],
        businessType: [{ value: null, disabled: this.editForm }, [Validators.required, Validators.nullValidator]],
        businessDescription: [{ value: '', disabled: this.editForm }, [Validators.required, Validators.nullValidator]],
        city: [{ value: null, disabled: this.editForm }, [Validators.required, Validators.nullValidator]],
        phone: [{ value: '', disabled: this.editForm }],
        zipCode: [{ value: '', disabled: this.editForm }, [Validators.required, Validators.nullValidator, Validators.minLength(5), Validators.maxLength(5)]],
        intNumb: [{ value: '', disabled: this.editForm }, [Validators.required, Validators.nullValidator]],
        extNumb: [{ value: '', disabled: this.editForm }, [Validators.required, Validators.nullValidator]],
        col: [{ value: null, disabled: this.editForm }, [Validators.required, Validators.nullValidator]],
        street: [{ value: '', disabled: this.editForm }, [Validators.required, Validators.nullValidator]],
        municipality: [{ value: null, disabled: this.editForm }, [Validators.required, Validators.nullValidator]],
        instagram: [{ value: '', disabled: this.editForm }],
        webPage: [{ value: '', disabled: this.editForm }],
        facebook: [{ value: '', disabled: this.editForm }],
        location: [{ value: '', disabled: this.editForm }],
        inicioLunes: ['1994-03-12T00:00:00'],
        finLunes: ['1994-03-12T00:00:00'],
        inicioViernes: ['1994-03-12T00:00:00'],
        finViernes: ['1994-03-12T00:00:00'],
        inicioJueves: ['1994-03-12T00:00:00'],
        finJueves: ['1994-03-12T00:00:00'],
        inicioMiercoles: ['1994-03-12T00:00:00'],
        finMiercoles: ['1994-03-12T00:00:00'],
        inicioMartes: ['1994-03-12T00:00:00'],
        finMartes: ['1994-03-12T00:00:00'],
        inicioSabado: ['1994-03-12T00:00:00'],
        finSabado: ['1994-03-12T00:00:00'],
        inicioDomingo: ['1994-03-12T00:00:00'],
        finDomingo: ['1994-03-12T00:00:00'],
        showBusiness: false,
        days: new FormArray([
          new FormControl({ 'weekday': 'L', 'weekdayDescription': 'Lunes', 'work': false }),
          new FormControl({ 'weekday': 'M', 'weekdayDescription': 'Martes', 'work': false }),
          new FormControl({ 'weekday': 'M', 'weekdayDescription': 'Miercoles', 'work': false }),
          new FormControl({ 'weekday': 'J', 'weekdayDescription': 'Jueves', 'work': false }),
          new FormControl({ 'weekday': 'V', 'weekdayDescription': 'Viernes', 'work': false }),
          new FormControl({ 'weekday': 'S', 'weekdayDescription': 'Sabado', 'work': false }),
          new FormControl({ 'weekday': 'D', 'weekdayDescription': 'Domingo', 'work': false }),
        ])
      }
    );

    this.selectedDays = {
      Lunes: false,
      Martes: false,
      Miercoles: false,
      Jueves: false,
      Viernes: false,
      Sabado: false,
      Domingo: false
    }

  }

  //desabilitar todo el formulario
  disableForm() {

    this.editForm = true;
    this.businessForm.controls['businessName'].disable();
    this.businessForm.controls['businessType'].disable();
    this.businessForm.controls['businessDescription'].disable();
    this.businessForm.controls['city'].disable();
    this.businessForm.controls['municipality'].disable();
    this.businessForm.controls['phone'].disable();
    this.businessForm.controls['zipCode'].disable();
    this.businessForm.controls['intNumb'].disable();
    this.businessForm.controls['extNumb'].disable();
    this.businessForm.controls['col'].disable();
    this.businessForm.controls['street'].disable();
    this.businessForm.controls['instagram'].disable();
    this.businessForm.controls['webPage'].disable();
    this.businessForm.controls['facebook'].disable();
    this.businessForm.controls['inicioLunes'].disable();
    this.businessForm.controls['finLunes'].disable();
    this.businessForm.controls['inicioViernes'].disable();
    this.businessForm.controls['finViernes'].disable();
    this.businessForm.controls['inicioJueves'].disable();
    this.businessForm.controls['finJueves'].disable();
    this.businessForm.controls['inicioMiercoles'].disable();
    this.businessForm.controls['finMiercoles'].disable();
    this.businessForm.controls['inicioMartes'].disable();
    this.businessForm.controls['finMartes'].disable();
    this.businessForm.controls['inicioSabado'].disable();
    this.businessForm.controls['finSabado'].disable();
    this.businessForm.controls['inicioDomingo'].disable();
    this.businessForm.controls['finDomingo'].disable();
    this.businessForm.controls['showBusiness'].disable();
  }

  //desabilitar todo el formulario
  enableForm() {

    this.editForm = false;

    this.businessForm.controls['businessName'].enable();
    this.businessForm.controls['businessType'].enable();
    this.businessForm.controls['businessDescription'].enable();
    this.businessForm.controls['city'].enable();
    this.businessForm.controls['municipality'].enable();
    this.businessForm.controls['phone'].enable();
    this.businessForm.controls['zipCode'].enable();
    this.businessForm.controls['intNumb'].enable();
    this.businessForm.controls['extNumb'].enable();
    this.businessForm.controls['col'].enable();
    this.businessForm.controls['street'].enable();
    this.businessForm.controls['instagram'].enable();
    this.businessForm.controls['webPage'].enable();
    this.businessForm.controls['facebook'].enable();
    this.businessForm.controls['inicioLunes'].enable();
    this.businessForm.controls['finLunes'].enable();
    this.businessForm.controls['inicioViernes'].enable();
    this.businessForm.controls['finViernes'].enable();
    this.businessForm.controls['inicioJueves'].enable();
    this.businessForm.controls['finJueves'].enable();
    this.businessForm.controls['inicioMiercoles'].enable();
    this.businessForm.controls['finMiercoles'].enable();
    this.businessForm.controls['inicioMartes'].enable();
    this.businessForm.controls['finMartes'].enable();
    this.businessForm.controls['inicioSabado'].enable();
    this.businessForm.controls['finSabado'].enable();
    this.businessForm.controls['inicioDomingo'].enable();
    this.businessForm.controls['finDomingo'].enable();
    this.businessForm.controls['showBusiness'].enable();


  }


  async startProcess() {
    const alert = await this.alertController.create({
      message: '¿Deseas iniciar el proceso?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Aceptar',
          role: 'confirm',
          handler: () => this.startTimer()
        }
      ],
    });
    await alert.present();
  }

  async pauseProcess() {
    const alert = await this.alertController.create({
      message: '¿Deseas pausar el proceso?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Aceptar',
          role: 'confirm',
          handler: () => this.pauseTimer()
        }
      ],
    });
    await alert.present();
  }


  timeLimit: number = 60;
  timeLeft: number = 0;
  interval: any;
  AssembledDoors: number= 0;

  date: Date = new Date();

  orderId: string = '' + Math.round(Math.random() * 1000) + this.date.getFullYear() + '-' 
    + this.date.getMonth() + '-' + this.date.getDate();

  startTimer() {

    this.interval = setInterval(() => {
      if(this.timeLeft < this.timeLimit) {
        this.timeLeft++;
      } else {
        this.timeLeft = 0;
        this.AssembledDoors++;
      }
    },1000)
  }

  pauseTimer() {
    clearInterval(this.interval);
  }
    



}



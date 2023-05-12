import { Component, OnInit, Input } from '@angular/core';
import { PopoverController, LoadingController, AlertController } from '@ionic/angular';
import { Router, NavigationStart } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { CatalogsService } from 'src/app/modules/home/share/services/catalogs.service';
import { DataService } from '../share/services/data.service';



@Component({
  selector: 'app-formula-business',
  templateUrl: './formula-business.page.html',
  styleUrls: ['./formula-business.page.scss'],
})
export class FormulaBusinessPage implements OnInit {

  formulaForm!: FormGroup;
  measure1:number = 0.6;
  measure2:number = 5.4;
  measure3:number= 6;
  measure4:number= 27.7;
  measure5:number= 7.2;
  measure6:number= 10.2;
  measure7:number= 23.4;


  isSubmited:boolean = false;

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
    this.inicializateForm();
  }


  get formulaHight() {
    return this.formulaForm && this.formulaForm.get('formulaHight') || null;
  }

  get formulaWidth() {
    return this.formulaForm && this.formulaForm.get('formulaWidth') || null;
  }

  get formulaType() {
    return this.formulaForm && this.formulaForm.get('formulaType') || null;
  }

  get peinazos_externos() {
    return this.formulaForm && this.formulaForm.get('peinazos_externos') || null;
  }

  get peinazos_externos_value() {
    return this.formulaForm && this.formulaForm.get('peinazos_externos_value') || null;
  }

  get cercos_externos() {
    return this.formulaForm && this.formulaForm.get('cercos_externos') || null;
  }

  get cercos_externos_value() {
    return this.formulaForm && this.formulaForm.get('cercos_externos_value') || null;
  }

  get peinazos_internos() {
    return this.formulaForm && this.formulaForm.get('peinazos_internos') || null;
  }

  get peinazos_internos_value() {
    return this.formulaForm && this.formulaForm.get('peinazos_internos_value') || null;
  }

  get cercos_internos() {
    return this.formulaForm && this.formulaForm.get('cercos_internos') || null;
  }

  get cercos_internos_value() {
    return this.formulaForm && this.formulaForm.get('cercos_internos_value') || null;
  }


  //se inicializa el form
  inicializateForm() {
    this.formulaForm = this.fb.group({
        formulaHight: [null, [Validators.required, Validators.nullValidator]],
        formulaWidth: [null, [Validators.required, Validators.nullValidator]],
        formulaType: [null, [Validators.required, Validators.nullValidator]],
        peinazos_externos: [null],
        peinazos_externos_value: [null],
        cercos_externos: [null],
        cercos_externos_value: [null],
        peinazos_internos: [null],
        peinazos_internos_value: [null],
        cercos_internos: [null],
        cercos_internos_value: [null],
    });
  }

  //desabilitar todo el formulario
  disableForm() {
   // this.editForm = true;
    this.formulaForm.controls['formulaHight'].disable();
    this.formulaForm.controls['formulaWidth'].disable();
    this.formulaForm.controls['formulaType'].disable();
  }

  //desabilitar todo el formulario
  enableForm() {
    //this.editForm = false;
    this.formulaForm.controls['formulaHight'].enable();
    this.formulaForm.controls['formulaWidth'].enable();
    this.formulaForm.controls['formulaType'].enable();
  }





async calculate() {
  this.isSubmited = true;


  const loading = await this.loadingController.create();
  await loading.present();

    
  console.log(this.formulaForm);
  if (!this.formulaForm.valid) {
    console.log("***** NO ES VALIDO ******");
    return;
  }

  let type = this.formulaForm.get('formulaType')?.value;
  if (type == 'liso') {

    this.formulaForm.controls['peinazos_externos'].setValue(0);
    this.formulaForm.controls['cercos_externos'].setValue(0);

    let hight = this.formulaForm.get('formulaHight')?.value / 10;
    let width = this.formulaForm.get('formulaWidth')?.value / 10;
    
    this.formulaForm.controls['cercos_externos_value'].setValue(hight + this.measure1);
    this.formulaForm.controls['peinazos_externos_value'].setValue(width - this.measure2);

    this.formulaForm.controls['peinazos_externos'].setValue(3);
    this.formulaForm.controls['cercos_externos'].setValue(2);

    await loading.dismiss();
    
  }
  if (type == 'ranurado') {
    this.formulaForm.controls['peinazos_externos'].setValue(0);
    this.formulaForm.controls['cercos_externos'].setValue(0);
    this.formulaForm.controls['peinazos_internos'].setValue(0);
    this.formulaForm.controls['cercos_internos'].setValue(0);


    //this.formulaForm.controls['formulaHight'].setValue(2359);
    //this.formulaForm.controls['formulaWidth'].setValue(985);

    let hight = this.formulaForm.get('formulaHight')?.value / 10;
    let width = this.formulaForm.get('formulaWidth')?.value / 10;

    //cercos externos
    this.formulaForm.controls['cercos_externos_value'].
      setValue(hight + this.measure1);
      console.log('cercos_externos' , this.formulaForm.controls['cercos_externos_value'].value);
    //cercos internos
    this.formulaForm.controls['cercos_internos_value'].
      setValue(this.formulaForm.controls['cercos_externos_value'].value - this.measure3);
      console.log('cercos_internos', this.formulaForm.controls['cercos_internos_value'].value);
    //peinazos inferior y superior
    this.formulaForm.controls['peinazos_externos_value'].setValue(width - this.measure2);
    console.log("peinazos inferior y superior", this.formulaForm.controls['peinazos_externos_value'].value);
    //peinazo central
    this.formulaForm.controls['peinazos_internos_value'].
      setValue(this.formulaForm.controls['peinazos_externos_value'].value - this.measure4);
    console.log("peinazo central", this.formulaForm.controls['peinazos_internos_value'].value);

    await loading.dismiss();
  }
  if (type == 'closet') {
    this.formulaForm.controls['peinazos_externos'].setValue(0);
    this.formulaForm.controls['cercos_externos'].setValue(0);
    this.formulaForm.controls['peinazos_internos'].setValue(0);
    this.formulaForm.controls['cercos_internos'].setValue(0);


    //this.formulaForm.controls['formulaHight'].setValue(2345);
    //this.formulaForm.controls['formulaWidth'].setValue(524);

    let hight = this.formulaForm.get('formulaHight')?.value / 10;
    let width = this.formulaForm.get('formulaWidth')?.value / 10;
    //cercos externos
    this.formulaForm.controls['cercos_externos_value'].
      setValue(hight + this.measure1);
      console.log('cercos_externos' , this.formulaForm.controls['cercos_externos_value'].value);
    //cercos internos
    this.formulaForm.controls['cercos_internos_value'].
      setValue(this.formulaForm.controls['cercos_externos_value'].value - this.measure5);
      console.log('cercos_internos', this.formulaForm.controls['cercos_internos_value'].value);
    //peinazos inferior y superior
    this.formulaForm.controls['peinazos_externos_value'].setValue(width - this.measure6);
    console.log("peinazos inferior y superior", this.formulaForm.controls['peinazos_externos_value'].value);
    //peinazo central
    this.formulaForm.controls['peinazos_internos_value'].
      setValue(this.formulaForm.controls['peinazos_externos_value'].value - this.measure7);
    console.log("peinazo central", this.formulaForm.controls['peinazos_internos_value'].value);

    await loading.dismiss();
  }
  if (type == '2v1h') {
    debugger;
    this.formulaForm.controls['peinazos_externos'].setValue(0);
    this.formulaForm.controls['cercos_externos'].setValue(0);

    let hight = this.formulaForm.get('formulaHight')?.value / 10;
    let width = this.formulaForm.get('formulaWidth')?.value / 10;
    
    this.formulaForm.controls['cercos_externos_value'].setValue(hight + this.measure1);
    this.formulaForm.controls['peinazos_externos_value'].setValue(width - this.measure2);

    this.formulaForm.controls['peinazos_externos'].setValue(4);
    this.formulaForm.controls['cercos_externos'].setValue(2);
    
    await loading.dismiss();
  }

}


  

  changeGroup () {
    this.isSubmited = false;
  }

}



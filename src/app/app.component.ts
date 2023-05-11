import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, RouterEvent, Event } from '@angular/router';
import { DataService } from './modules/home/share/services/data.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  
    constructor(
      private router: Router,
      private dataService: DataService
    ) {
    //router.events.pipe(filter((event: any) => event instanceof NavigationStart))

    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        console.log("Terminando de cargar... appcomponent");
        console.log(val.url)
        this.dataService.pageTitle = this.generateTitle(val.url);
      }
       
    });

  }

  ngOnInit () {
    console.log("*****INICIANDO APP*******");
    
  }

  //cambia el path por el nombre de la pagina
  generateTitle(path: string) {
    if (path =='/home/data-business') {
      return 'Empalme';
    } 
    if (path =='/home/data-business1') {
      return 'Armado';
    }
    if (path =='/home') {
      return 'Puertas SA. de C.V';
    }
    if (path == '/home/formula-business') {
      return 'Fórmulas';
    }
    return '';
  }

}

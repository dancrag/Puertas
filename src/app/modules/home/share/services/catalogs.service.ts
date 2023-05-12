import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { DataService } from './data.service';

interface ICreateCatalog {
  name: string;
  start: string;
  end: string;
  days: [
    {
      weekday: string;
      weekdayDescription: string;
      work: boolean;
    },
    {
      weekday: string;
      weekdayDescription: string;
      work: boolean;
    },
    {
      weekday: string;
      weekdayDescription: string;
      work: boolean;
    },
    {
      weekday: string;
      weekdayDescription: string;
      work: boolean;
    },
    {
      weekday: string;
      weekdayDescription: string;
      work: boolean;
    },
    {
      weekday: string;
      weekdayDescription: string;
      work: boolean;
    },
    {
      weekday: string;
      weekdayDescription: string;
      work: boolean;
    }
  ];
  categories: null;
};

interface IUpdateCatalog {
  id: string;
  active: boolean;
  name: string;
  start: string;
  end: string;
  days: [
    {
      weekday: string;
      weekdayDescription: string;
      work: boolean;
    },
    {
      weekday: string;
      weekdayDescription: string;
      work: boolean;
    },
    {
      weekday: string;
      weekdayDescription: string;
      work: boolean;
    },
    {
      weekday: string;
      weekdayDescription: string;
      work: boolean;
    },
    {
      weekday: string;
      weekdayDescription: string;
      work: boolean;
    },
    {
      weekday: string;
      weekdayDescription: string;
      work: boolean;
    },
    {
      weekday: string;
      weekdayDescription: string;
      work: boolean;
    }
  ];
  categories: null;
};

interface IBusinessData {
  ownerId?: string;
  id?: string;
  name: string;
  businessTypeId: string;
  description: string;
  hourHand: [
    {
      weekday: string;
      start: string;
      end: string;
    },
    {
      weekday: string;
      start: string;
      end: string;
    },
    {
      weekday: string;
      start: string;
      end: string;
    },
    {
      weekday: string;
      start: string;
      end: string;
    },
    {
      weekday: string;
      start: string;
      end: string;
    },
    {
      weekday: string;
      start: string;
      end: string;
    },
    {
      weekday: string;
      start: string;
      end: string;
    }
  ];
  phone: number;
  postalCode: string;
  federalEntity: string;
  municipality: string;
  cologne: string;
  street: string;
  outdoorNumber: string;
  interiorNumber: string;
  location: string;
  instagram: string;
  facebook: string;
  webPage: string;
  businessApplication: boolean;
  active?: boolean;
}


@Injectable({
  providedIn: 'root'
})

export class CatalogsService {

  createCatalog!: ICreateCatalog;
  updatesCatalog!: IUpdateCatalog;
  businessData!: IBusinessData;
  url_local: string = environment.catalogsServices;
  maps_key: string = environment.GOOGLE_MAPS_KEY;
  owner?: string = this.dataService.ownerId;

  constructor(
    private http: HttpClient,
    //private auth: Auth,
    private dataService: DataService
  ) { }

  //Servicio que obtiene todos los catalogos registrados activos
  getCatalogs(ownerId: string, businessId: string): Observable<any> {
    let url = `${this.url_local}/owner/${ownerId}/business/${businessId}/catalogue/active/true`;
    console.log("url get catalogos", url);
    return this.http.get(url);
  }

  getCatalogId(id: any, ownerId: string, businessId: string): Observable<any> {
    let url = `${this.url_local}/owner/${ownerId}/business/${businessId}/catalogue/${id}`;
    console.log("url get catalogo por id", url);
    return this.http.get(url);
  }

  //Servicio que guarda un catalogo
  saveCatalogs(catalog: any, ownerId: string, businessId: string): Observable<any> {
    let hrStart = catalog.start.substring(11, 16);
    let hrEnd = catalog.end.substring(11, 16);

    this.createCatalog = {
      name: catalog.name,
      start: hrStart,
      end: hrEnd,
      days: catalog.days,
      categories: null
    };

    let url = `${this.url_local}/owner/${ownerId}/business/${businessId}/catalogue`;
    console.log("url saveCatalogos", url);

    return this.http.post(url, this.createCatalog);
  }

  //Servicio que actualiza catalogo
  updateCatalog(idCatalog: string, catalog: any, ownerId: string, businessId: string): Observable<any> {
    let hrStart = catalog.start.substring(11, 16);
    let hrEnd = catalog.end.substring(11, 16);

    this.updatesCatalog = {
      id: idCatalog,
      active: true,
      name: catalog.name,
      start: hrStart,
      end: hrEnd,
      days: catalog.days,
      categories: null
    };

    return this.http.put(`${this.url_local}/owner/${ownerId}/business/${businessId}/catalogue`, this.updatesCatalog);
  }

  //Servicio que elimina un catalogo
  deleteCatalog(id: any, ownerId: string, businessId: string): Observable<any> {
    const url = `${this.url_local}/owner/${ownerId}/business/${businessId}/catalogue/${id}`
    console.log("eliminando catalogo", url);
    return this.http.delete(url);
  }

  //Servicio que obtiene los tipos de negocio
  getbusinessType(): Observable<any> {
    return this.http.get(`${this.url_local}/business/type`);
  }

  //Servicio que obtine el codigo postal
  getZipCode(zipCode: any): Observable<any> {
    return this.http.get(`${this.url_local}/addresses/${zipCode}`);
  }

  //guardar datos negocio
  saveBusinessData(business: any, owner: string) {
    this.businessData = {
      ownerId: owner ,
      name: business.businessName,
      businessTypeId: business.businessType.id,
      description: business.businessDescription,
      hourHand: [{
        weekday: business.days[0].weekdayDescription,
        start: business.inicioLunes.split("T")[1].substring(0, 5),
        end: business.finLunes.split("T")[1].substring(0, 5)
      },
      {
        weekday: business.days[1].weekdayDescription,
        start: business.inicioMartes.split("T")[1].substring(0, 5),
        end: business.finMartes.split("T")[1].substring(0, 5)
      },
      {
        weekday: business.days[2].weekdayDescription,
        start: business.inicioMiercoles.split("T")[1].substring(0, 5),
        end: business.finMiercoles.split("T")[1].substring(0, 5)
      },
      {
        weekday: business.days[3].weekdayDescription,
        start: business.inicioJueves.split("T")[1].substring(0, 5),
        end: business.finJueves.split("T")[1].substring(0, 5)
      },
      {
        weekday: business.days[4].weekdayDescription,
        start: business.inicioViernes.split("T")[1].substring(0, 5),
        end: business.finViernes.split("T")[1].substring(0, 5)
      },
      {
        weekday: business.days[5].weekdayDescription,
        start: business.inicioSabado.split("T")[1].substring(0, 5),
        end: business.finSabado.split("T")[1].substring(0, 5)
      },
      {
        weekday: business.days[6].weekdayDescription,
        start: business.inicioDomingo.split("T")[1].substring(0, 5),
        end: business.finDomingo.split("T")[1].substring(0, 5)
      }],
      phone: business.phone,
      postalCode: business.zipCode,
      federalEntity: business.city.name,
      municipality: business.municipality.name,
      cologne: business.col.name,
      street: business.street,
      outdoorNumber: business.extNumb,
      interiorNumber: business.intNumb,
      location: business.location,
      instagram: business.instagram,
      facebook: business.facebook,
      webPage: business.webPage,
      businessApplication: business.showBusiness
    };
    var formData: any = new FormData();
    formData.append("request", JSON.stringify(this.businessData));
    formData.append("avatar", "hola");
    console.log("Business usuario", this.owner);
    return this.http.post(`${this.url_local}/owner/${owner}/business`, formData);

  }

  //guardar datos negocio
  updateBusinessData(business: any, owner: string) {
    this.businessData = {
      id: business.idBusiness,
      ownerId: this.owner,
      name: business.businessName,
      businessTypeId: business.businessType.id,
      description: business.businessDescription,
      hourHand: [{
        weekday: business.days[0].weekdayDescription,
        start: business.inicioLunes.split("T")[1].substring(0, 5),
        end: business.finLunes.split("T")[1].substring(0, 5)
      },
      {
        weekday: business.days[1].weekdayDescription,
        start: business.inicioMartes.split("T")[1].substring(0, 5),
        end: business.finMartes.split("T")[1].substring(0, 5)
      },
      {
        weekday: business.days[2].weekdayDescription,
        start: business.inicioMiercoles.split("T")[1].substring(0, 5),
        end: business.finMiercoles.split("T")[1].substring(0, 5)
      },
      {
        weekday: business.days[3].weekdayDescription,
        start: business.inicioJueves.split("T")[1].substring(0, 5),
        end: business.finJueves.split("T")[1].substring(0, 5)
      },
      {
        weekday: business.days[4].weekdayDescription,
        start: business.inicioViernes.split("T")[1].substring(0, 5),
        end: business.finViernes.split("T")[1].substring(0, 5)
      },
      {
        weekday: business.days[5].weekdayDescription,
        start: business.inicioSabado.split("T")[1].substring(0, 5),
        end: business.finSabado.split("T")[1].substring(0, 5)
      },
      {
        weekday: business.days[6].weekdayDescription,
        start: business.inicioDomingo.split("T")[1].substring(0, 5),
        end: business.finDomingo.split("T")[1].substring(0, 5)
      }],
      phone: business.phone,
      postalCode: business.zipCode,
      federalEntity: business.city.name,
      municipality: business.municipality.name,
      cologne: business.col.name,
      street: business.street,
      outdoorNumber: business.extNumb,
      interiorNumber: business.intNumb,
      location: business.location,
      instagram: business.instagram,
      facebook: business.facebook,
      webPage: business.webPage,
      businessApplication: business.showBusiness,
      active: true
    };
    var formData: any = new FormData();
    formData.append("request", JSON.stringify(this.businessData));
    formData.append("avatar", "hola");
    return this.http.put(`${this.url_local}/owner/${owner}/business`, formData);

  }

  //obtener coordenadas google maps
  getCoodinates(businessForm: any): Observable<any> {

    console.log("COORDENADAS", businessForm);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${this.builString(businessForm.extNumb)},${this.builString(businessForm.street)},${this.builString(businessForm.col.name)},${this.builString(businessForm.municipality.name)},+MX,${this.builString(businessForm.zipCode)},+CDMX&key=${this.maps_key}`;
    console.log("url", url);
    //return this.http.post(`https://maps.googleapis.com/maps/api/geocode/json?key=${this.maps_key}&address=${businessForm.street}%20${businessForm.extNumb}%20${businessForm.col}%20CDMX%20Mexico%2002760`, null); 
    // `https://maps.googleapis.com/maps/api/geocode/json?address=${this.builString(businessForm.extNumb)},+Pinos,+Pasteros,+Azcapotzalco,+MX,+02150,+CDMX&key=${this.maps_key}`;  

    return this.http.post(url, null);
  }

  builString(text: string) {
    return '+' + text.replace(' ', '+');
  }

  //consultar todos los negocios
  getAllBusiness(ownerId: any): Observable<any> {
    const url = `${this.url_local}/owner/${ownerId}/business/active/true`;
    console.log("URL getAllBusiness", url);
    return this.http.get(url);
  }

  getBusinessDataById(ownerId: string, businessId: string) {
    const url = `${this.url_local}/owner/${ownerId}/business/${businessId}`;
    console.log("URL getBusinessDataById", url);
    return this.http.get(url);
  }

}

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface ICustomizer {
  name: string;
  description: string;
  price: string;
  iva: string;
  total: string;
}

interface IUpdateCustomizer {
  id: number;
  active: boolean;
  name: string;
  description: string;
  price: string;
  iva: string;
  total: string;
}
interface IGroupData{
  name: string;
  customerSelectOption: boolean;
  maximumNumberCustomizers: boolean;
  amountMaximumNumberCustomizers: string;
  timesCustomerSelectOption: string;
  
}

@Injectable({
  providedIn: 'root'
})
export class GroupsPersonalizationService {

  url_local: string = environment.catalogsServices;
  customizer!: ICustomizer;
  updatesCustomizer!: IUpdateCustomizer;
  groupData!: IGroupData;
  constructor(
    private http: HttpClient,
  ) { }

  //SERVICES FOR CUSTOMIZER
  getCustomizerActive(ownerId: string, businessId: string): Observable<any> {
    let url = `${this.url_local}/owner/${ownerId}/business/${businessId}/catalogue/category/services-products/customization-group/customizer/active/true`;
    return this.http.get(url);
  }

  saveCustomizer(customizer: any, ownerId: string, businessId: string): Observable<any> {

    this.customizer = {
      name: customizer.name,
      description: customizer.description,
      price: customizer.price,
      iva: customizer.iva,
      total: customizer.total
    };

    let url = `${this.url_local}/owner/${ownerId}/business/${businessId}/catalogue/category/services-products/customization-group/customizer`;
    return this.http.post(url, this.customizer);
  }

  getCustomizerForId(idCustomizer: string, ownerId: string, businessId: string): Observable<any> {
    let url = `${this.url_local}/owner/${ownerId}/business/${businessId}/catalogue/category/services-products/customization-group/customizer/${idCustomizer}`;
    return this.http.get(url);
  }

  updateCustomizer(idCustomizer: number, customizer: any, ownerId: string, businessId: string): Observable<any> {

    this.updatesCustomizer = {
      id: idCustomizer,
      active: true,
      name: customizer.name,
      description: customizer.description,
      price: customizer.price,
      iva: customizer.iva,
      total: customizer.total
    };

    let url = `${this.url_local}/owner/${ownerId}/business/${businessId}/catalogue/category/services-products/customization-group/customizer`;
    return this.http.put(url, this.updatesCustomizer);
  }

  deleteCustomizer(idCustomizer: number, ownerId: string, businessId: string): Observable<any> {
    let url = `${this.url_local}/owner/${ownerId}/business/${businessId}/catalogue/category/services-products/customization-group/customizer/${idCustomizer}`;
    return this.http.delete(url);
  }


  getGroups(ownerId: string, businessId: string): Observable<any> {
    let url = `${this.url_local}/owner/${ownerId}/business/${businessId}/catalogue/category/services-products/customization-group/active/true`;
    console.log("url get groups", url);
    return this.http.get(url);
  }

  saveGroup(group: any, businessId: string, ownerId: string): Observable<any> {
    console.log('Validate  Group ', group);
    this.groupData = {
      name: group.groupName,
      customerSelectOption: true,
      maximumNumberCustomizers: false,
      amountMaximumNumberCustomizers: group.maxNumberClient,
      timesCustomerSelectOption: group.selectOptionClient,
    };

    console.log('productsData ', this.groupData);
    let url = `${this.url_local}/owner/${ownerId}/business/${businessId}/catalogue/category/services-products/customization-group`;
    console.log("url saveGroup", url);

    return this.http.post(url, this.groupData);
    
  }

  // {{URL_LOCAL}}/owner/ha5AdQHjC6NO8wkA3rDfIQkQBN82/business/1/catalogue/category/services-products/customization-group/1
    //Servicio que elimina una categoria
    deleteGroup(idGroup: any, ownerId: string, businessId: string): Observable<any> {
      return this.http.delete(`${this.url_local}/owner/${ownerId}/business/${businessId}/catalogue/category/services-products/customization-group/${idGroup}`);
    }


    //Servicio que obtiene todas los personalizadores activos
  getPersonalizationAll(ownerId: string, businessId: string): Observable<any> {
    let url = `${this.url_local}/owner/${ownerId}/business/${businessId}/catalogue/category/services-products/customization-group/customizer/active/true`;
    console.log("url get personalization", url);
    return this.http.get(url);
  }
}

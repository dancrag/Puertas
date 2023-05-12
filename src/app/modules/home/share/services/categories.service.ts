import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';


interface ICatalog {
  id: string;
}

interface ICreateCategory {
  category: {
    name: string;
    servicesProducts: any;
  }
  catalogues: ICatalog[];
};

interface IUpdateCategories {
  category: {
    id: string;
    name: string;
    active: boolean;
    servicesProducts: any;
  }
  catalogues: ICatalog[];
};

@Injectable({
  providedIn: 'root'
})

export class CategoriesService {

  catalog!: ICatalog;
  createCategory!: ICreateCategory;
  updatesCategories!: IUpdateCategories;
  url_local: string = environment.catalogsServices;
  owner?: string = this.auth.currentUser?.uid; /**Posible borrado */

  constructor(private http: HttpClient, private auth: Auth) { }

  //Servicio que guarda una categoría
  saveCategory(category: any, ownerId: string, businessId: string): Observable<any> {
   
   console.log("Catalogss ------", category.businessCatalog);
    
    let arrayCatalogs: ICatalog[] = [];
    category.businessCatalog.forEach((elem: string) => {
      this.catalog = {
        id: elem
      }
      arrayCatalogs.push(this.catalog);
    });

    this.createCategory = {
      category: {
        name: category.name,
        servicesProducts: null
      },
      catalogues: arrayCatalogs
    };
    return this.http.post(`${this.url_local}/owner/${ownerId}/business/${businessId}/catalogue/category`, this.createCategory);
  }

  //Servicio que actualiza una categoría
  updateCategory(idCatalog: string, category: any, ownerId: string, businessId: string): Observable<any> {

    let arrayCatalogs: ICatalog[] = [];
    category.businessCatalog.forEach((elem: string) => {
      this.catalog = {
        id: elem
      }
      arrayCatalogs.push(this.catalog);
    });

    this.updatesCategories = {
      category: {
        id: idCatalog,
        name: category.name,
        active: true,
        servicesProducts: null
      },
      catalogues: arrayCatalogs
    };

    return this.http.put(`${this.url_local}/owner/${ownerId}/business/${businessId}/catalogue/category`, this.updatesCategories);
  }

  //Servicio que elimina una categoria
  deleteCategory(idCategory: any, ownerId: string, businessId: string): Observable<any> {
    return this.http.delete(`${this.url_local}/owner/${ownerId}/business/${businessId}/catalogue/category/${idCategory}`);
  }


  //Servicio que obtiene todas las categorias registradas activas
  getCategoriesAll(ownerId: string, businessId: string): Observable<any> {
    let url = `${this.url_local}/owner/${ownerId}/business/${businessId}/catalogue/category/active/true`;
    console.log("url get categorias", url);
    return this.http.get(url);
  }

  //Servicio que obtiene una categoría por ID
  getCategoryId(id: string, ownerId: string, businessId: string): Observable<any> {
    let url = `${this.url_local}/owner/${ownerId}/business/${businessId}/catalogue/category/${id}`;
    console.log("url get category for Id", url);
    return this.http.get(url);
  }
}

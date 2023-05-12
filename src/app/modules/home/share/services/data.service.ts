import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  selectedBusinessId: string = '';
  selectedCatalogId: string = '';
  selectedCategoryId: string = '';
  selectedProductId: string = '';
  ownerId: string = '';
  pageTitle: string = '';
  businessImg: string = '';
  isAdmin: boolean = false;
  ownerName: string = '';

  constructor() { }

 /*
  set pageTitle(title: string) {
   let splitTitle = title.split("/");
    let splitSize = splitTitle.length - 1;
    
    if(splitSize == 0) {
      this.pageTitle = title
    }
    
    
    console.log(splitTitle);
    console.log(splitSize);
    
    if (splitTitle[splitSize].includes('products-services')) {
      this.pageTitle = "Productos & Servicios"
    }
    if (splitTitle[splitSize].includes('catalogs')) {
      this.pageTitle = "Catálogos"
    }
    if (splitTitle[splitSize].includes('categories')) {
      this.pageTitle = "Categorias"
    }

  }*/  


}

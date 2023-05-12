import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth } from '@angular/fire/auth';
import { environment } from "../../../../../environments/environment";



@Injectable({
  providedIn: 'root'
})
export class ProductsService {



  createProducto!: ICreateProducto;
  updatesProducto!: IUpdateProducto;
  url_local: string = environment.catalogsServices;
  owner?: string = this.auth.currentUser?.uid;
  productsData!: IProductData;
  updateProductData!: IUpdateProductData;

  constructor(private http: HttpClient, private auth: Auth) { }



  //Servicio que obtiene todos los productos registrados
  getAllProducts(businessId: string, idCatalogue: string ): Observable<any> {
   
    let url = `${this.url_local}/owner/${this.owner}/business/${businessId}/catalogue/category/services-products/active/true`;
    console.log("url get products", url);
    return this.http.get(url);
  }


  //Servicio que guarda un producto
  saveProducts(products: any, file: any, businessId: string, catalogueId: string): Observable<any> {
    catalogueId = 'ad59542c-41f5-416d-949f-4be17acc35d1';
    console.log('Valida products ', products);
    console.log('###### ', businessId);
    console.log('###### ', catalogueId);
    
   
    console.log("IMG ",file.name );
    console.log("Catalogss ------", products.productCatCategory);

    this.productsData = {
      name: products.name,
      description: products.description,
      singleSale: false,
      priceProduct: products.priceProduct,
      categories: products.productCatCategory,
    };

    console.log('productsData ', this.productsData);
    var formData: any = new FormData();
    formData.append("request", JSON.stringify(this.productsData));
    formData.append("file", file, file.name);
    console.log('************** ', formData);
    return this.http.post(`${this.url_local}/owner/${this.owner}/business/${businessId}/catalogue/category/services-products`, formData);
  }

  //Servicio que obtiene producto por id
  getProductId(id: string, businessId: string, catalogueId: string): Observable<any> {
  
    let url = `${this.url_local}/owner/${this.owner}/business/${businessId}/catalogue/category/services-products/${id}`;
    console.log("url get product for Id", url);
    return this.http.get(url);
  }

   //Servicio que elimina un catalogo
   deleteProduct(id: any, businessId: string, catalogueId: string): Observable<any> {
    
   
    console.log('Valida products ');
    const url = `${this.url_local}/owner/${this.owner}/business/${businessId}/catalogue/category/services-products/${id}`
    console.log("eliminando producto", url);
    return this.http.delete(url);
  }


   //Servicio que actualiza producto
   updateProduct(idProduct: string, product: any, businessId: string, catalogueId: string): Observable<any> {
    catalogueId = 'ad59542c-41f5-416d-949f-4be17acc35d1';
    console.log('Actualiza Producto');
    
    
    this.updateProductData = {
      id:idProduct,
      name: product.name,
      description: product.description,
      singleSale: false,
      priceProduct: product.priceProduct,
      categories: product.productCatCategory,
      active: true
    };

    console.log('productsData Update', this.updateProductData);
    var formData: any = new FormData();
    formData.append("request", JSON.stringify(this.updateProductData));
    console.log('************** >>> ', formData);
    return this.http.put(`${this.url_local}/owner/${this.owner}/business/${businessId}/catalogue/${catalogueId}/category/services-products`, formData);

    
  }
}


interface ICreateProducto{
  name: String;
  description: string;
  singleSale: false;
  priceProduct: string;
  categories: string[];
 
}

interface IUpdateProducto{
  id: string;
  name: string;
  servicesProducts: null;
}

interface IProductData{
  name: string;
  description: string;
  singleSale: boolean;
  priceProduct: string;
  categories: string[];
  
}

interface IUpdateProductData{
  id: string;
  name: string;
  description: string;
  singleSale: boolean;
  priceProduct: string;
  categories: string[];
  active:boolean;
  
}
import { Product } from './../../models/product.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
export class ProductService{
   amnesiaURL= "https://amnesia-skincare.herokuapp.com/api/";
    //{{amnesiaURL}}/products/?limit=4&skip=1
    token = localStorage.getItem('token') || 'empty-token'
    products:Product[]=[];
    constructor(private http:HttpClient) {}
    getAllProducts(){
      return this.products.slice(); //copy from products
    }
    getProductInfo(_id){
      return this.http.get(`${this.amnesiaURL}products/product/${_id}`)
    }
    getAllProductsApi(pname,skip,take){
      console.log('sssss')
      return this.http.get(`${this.amnesiaURL}products/${pname}?limit=${take}&skip=${skip}`); //copy from products
    }
    deleteProduct(_id){
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: this.token
        })
      };
      return this.http.delete(`${this.amnesiaURL}products/${_id}`,httpOptions);
    }
    editProduct(_id,updates){
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: this.token
        })
      };
      return this.http.patch(`${this.amnesiaURL}products/${_id}`,updates,httpOptions)
    }
    addProduct(product){
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: this.token
        })
      };
      return this.http.post(`${this.amnesiaURL}products/product`,product,httpOptions)
    }
    addImage(id,image){
      
    }
}
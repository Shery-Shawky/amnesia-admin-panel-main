import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  /*ctor*/
  constructor(private myClient: HttpClient) {
    console.log(myClient);
    console.log("ctor")
  }

  /*local storage*/
  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDMxYTM0NzI4MmQ4MDAwMTVmODczZjgiLCJpYXQiOjE2MTQ0NDE1NzV9.y3PBLeU1Y-SlAxmqVKjTiT8BMnbVPEIgFy8hs7VHiRA'

  localStorageToken = (token) => {
    localStorage.setItem('token', token)
    return localStorage.getItem('token');
  }

  private baseURL: string = "https://amnesia-skincare.herokuapp.com/api"
  
    /*diplay product by id*/
    displayProductById(id) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: this.token
        })
      };
      return this.myClient.get(`${this.baseURL}/products/${id}`, httpOptions);
    }

}

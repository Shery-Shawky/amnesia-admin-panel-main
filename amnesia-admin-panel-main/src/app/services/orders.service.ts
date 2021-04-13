import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  /*ctor*/
  constructor(private myClient: HttpClient) {
    console.log(myClient);
    console.log("ctor")
  }

  /*local storage*/
  token = localStorage.getItem("token") || "no token"
  // token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDMxYTM0NzI4MmQ4MDAwMTVmODczZjgiLCJpYXQiOjE2MTQ0NDE1NzV9.y3PBLeU1Y-SlAxmqVKjTiT8BMnbVPEIgFy8hs7VHiRA'
  private baseURL: string = "https://amnesia-skincare.herokuapp.com/api"
  updateOrder(_id,orderStatus){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.token
      })
    };
    return this.myClient.patch(`${this.baseURL}/orders/changestatus`,{_id,orderStatus},httpOptions)
  }
  /*diplay orders*/
  displayOrders(id) {
    console.log(this.token)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.token
      })
    };
    return this.myClient.get(`${this.baseURL}/orders/for/${id}`, httpOptions);
  }
  getAllorders(status, limit, skip) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.token
      })
    };
    return this.myClient.get(`${this.baseURL}/orders/all/${status}/?limit=${limit}&skip=${skip}`, httpOptions);
  }
  /*diplay one order*/
  displayOneOrder(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.token
      })
    };
    return this.myClient.get(`${this.baseURL}/orders/order/${id}`, httpOptions);
  }

  /*diplay cart*/
  displayCart() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.token
      })
    };
    return this.myClient.get(`${this.baseURL}/api/orders`, httpOptions);
  }

  /*patch add order*/
  addOrder(orderinfoJson) {
    console.log(orderinfoJson)
    console.log(this.token)
    console.log(typeof orderinfoJson)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.token
      })
    };
    return this.myClient.post(`${this.baseURL}/orders`, orderinfoJson, httpOptions);
  }

  /*delete product from cart by id*/
  deleteProductFromCart() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.token
      })
    };
    return this.myClient.delete(`${this.baseURL}/product/`, httpOptions);
  }

  /* delete order by id */
  deleteOrderById(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.token
      })
    };
    return this.myClient.delete(`${this.baseURL}/orders/${id}`, httpOptions);
  }
}
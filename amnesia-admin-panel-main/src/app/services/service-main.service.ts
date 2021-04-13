import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ServiceMainService {
  baseURL = "https://amnesia-skincare.herokuapp.com/api";
  productInfo;
  constructor(private http: HttpClient, public _router:Router) {
   }
  getProductById(id){
    console.log(id);
    // const options = {
    //   responseType: 'json',
    //   observe: 'response' 
    // };
    return this.http.get(`${this.baseURL}/products/${id}`);
  }
  getProfile(token):Observable<{}>{
    try {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          Authorization: token
        })
      };
      return this.http.get(`${this.baseURL}/users/profile`,httpOptions)
      // .pipe(
      //     catchError((err)=>handleError(err,this))
      // );
    } catch (error) {
      let user = new Observable((observer)=>{
        observer.next({success:false})
      })
      return user
    }
  }
  addFavorite(token,id){
    const body ={
      "_id":id
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: token
      })
    };
    return this.http.post(`${this.baseURL}/products/favorites/${id}`,body,httpOptions)
  }
  postRatingById(token,rating,id):Observable<{}>{
    const body ={
      "rating":rating
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: token
      })
    };
    return this.http.post(`${this.baseURL}/products/rating/${id}`,body,httpOptions);
  }
}

function handleError(error: HttpErrorResponse,comp:ServiceMainService){
  if (error.status==401){
    comp._router.navigate(['/fail']);
  }
  return throwError({error,success:false});
}

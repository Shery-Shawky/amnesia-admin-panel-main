import { HttpClient } from '@angular/common/http';
import  { Injectable } from '@angular/core';


@Injectable({
    providedIn:'root'
})
export class ContactUsService{

constructor(private http:HttpClient) {
        
}


sendContactUsInfo(contactInfo){
   return this.http.post('https://amnesia-skincare.herokuapp.com/api/users/contactus',contactInfo)
}


}
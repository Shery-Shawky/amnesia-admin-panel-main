import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private myClient: HttpClient) { }

  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDMxYTM0NzI4MmQ4MDAwMTVmODczZjgiLCJpYXQiOjE2MTQ0NDE1NzV9.y3PBLeU1Y-SlAxmqVKjTiT8BMnbVPEIgFy8hs7VHiRA'

  private baseURL: string = "https://amnesia-skincare.herokuapp.com/api"
  public uploadImage(id,image: File){
    const httpOptions = {
        headers: new HttpHeaders({
          'Authorization':localStorage.getItem('token')
        })
      };
    const formData = new FormData();

    formData.append('image', image);

    return this.myClient.post(`${this.baseURL}/images/product/${id}`, formData,httpOptions);
  }
  //get profile image
  getProfileImage(imgname) {
    console.log(imgname)
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     Authorization: this.token
    //   })
    // }
    return this.myClient.get(`${this.baseURL}/images/show/${imgname}`, { responseType: 'blob' });
  }

  // //post edit profile image
  // editUserImg(userImgEdited) {
  //   console.log(userImgEdited)
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       image: userImgEdited
  //     })
  //   };
  //   return this.myClient.post(`${this.baseURL}/images/user/`, userImgEdited, httpOptions);
  // }

  //patch edit profile image
  editUserImg(image: File):Observable<any>{
    // debugger;
    let formData = new FormData();
    console.log(image)
    formData.append('image', image,image.name);
    console.log(formData.get('image'));
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.token
      })
    }
    return this.myClient.post(`${this.baseURL}/images/user/`, formData, httpOptions);
  }
}

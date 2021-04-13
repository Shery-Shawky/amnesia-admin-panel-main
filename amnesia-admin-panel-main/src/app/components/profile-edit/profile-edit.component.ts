import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.service'
import { ImageService } from '../../services/image.service'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, throwError } from 'rxjs';
import { shareReplay, catchError } from 'rxjs/operators';
import { formatDate } from '@angular/common';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';



class ImageSnippet {
  constructor(public src: string, public file: File) { }
}


@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit, OnDestroy {

  profImage: String;

  /*ctor*/
  constructor(private myService: UsersService, private myServiceImg: ImageService, private http: HttpClient, private myActivatedRoute: ActivatedRoute, private router:Router) { }

  self = this
  htmlToAdd

  /*var*/
  user
  subscriber
  gender = ["male", "female"]
  genderAns
  passwordErr: String = "hide"
  userimg
  subscriberimg
  isFetch = false
  error = null
  isFetching = true
  isFetchingImg = false
  isError = false

  /*change select*/
  onChange = (value: any) => {
    console.log(value);
    this.genderAns = value
  }


  /*validation on editing*/
  myForm = new FormGroup({
    firstname: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z]*"), Validators.maxLength(8)]),
    lastname: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z]*"), Validators.maxLength(8)]),
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z]{1}[a-zA-Z0-9.\-_]*@[a-zA-Z]{1}[a-zA-Z.-]*[a-zA-Z]{1}[.][a-zA-Z]{3,}$")]),
    phone: new FormControl('', [Validators.required, Validators.pattern("[0-9]*")]),
    password: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z]*")]),
    city: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z]*")]),
    street: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required])
  })


  /*save changes*/
  saveChanges(this) {
    console.log(this.myForm.controls)
    if (this.myForm.valid) {
      console.log("valid")
      // this.isError = true
      // console.log(this.myForm.value)
      const userinfoEdited = {
        "email": this.myForm.value.email,
        "firstname": this.myForm.value.firstname,
        "lastname": this.myForm.value.lastname,
        "addresses": [`${this.myForm.value.country}`, `${this.myForm.value.city}`, `${this.myForm.value.street}`].join(', '),
        "phones": this.myForm.value.phone,
        "userPassword": this.myForm.value.password,
        "gender": this.genderAns?"male":new Error("jujuh")
      }
      console.log(this.genderAns)
      console.log(userinfoEdited)
      const userinfoEditedJson = JSON.stringify(userinfoEdited)
      this.isError = false
      this.subscriber = this.myService.editUser(userinfoEditedJson)
        .subscribe((userinfoEditedJson) => {
          this.isError = false
          console.log(userinfoEditedJson);
          this.reloadComponent();
          this.passwordErr = "hide"
        },
          (error) => {
            console.log(error);
            this.isError = true
            this.isFetching=false
          }
        )
    }
    else {
      console.log("invalid")
    }
  }


  /*get user profile*/
  showProfile() {
    this.isFetching = true
    this.isError = false
    this.subscriber = this.myService.getProfile()
      .subscribe((userr) => {
        this.isFetching = false
        this.isError = false
        console.log(userr);
        this.user = userr;
        this.genderAns = this.user.user.gender
        this.myForm.patchValue({
          firstname: this.user.user.firstname,
          lastname: this.user.user.lastname,
          email: this.user.user.email,
          phone: this.user.user.phones || "",
          gender: this.user.user.gender,
          password: this.user.password,
          country: this.user.user.addresses.split(', ')[0] || "",
          city: this.user.user.addresses.split(', ')[1] || "",
          street: this.user.user.addresses.split(', ')[2] || "",
          // img : this.user.user.profileImage || ""
        })
        this.profImage = `https://amnesia-skincare.herokuapp.com/api/images/show/${this.user.user.profileImage}` || "http://nwsid.net/wp-content/uploads/2015/05/dummy-profile-pic.png"
      },
        (error) => {
          console.log(error);
          this.isError = true
          this.isFetching=false
        }
      )
  }

  /* load image */
  selectedFile: ImageSnippet;
  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.myServiceImg.editUserImg(this.selectedFile.file)
        .subscribe((res) => {
          console.log("ssssss");
          console.log(res);
        },
          (err) => {
            console.log("rrr");
            console.log(err);
          })
    });

    reader.readAsDataURL(file);
  }


  /*delete*/
  deleteAccount() {
    var confirmationDel = confirm("Are you sure you want to delete your account?")
    if (confirmationDel) {
      this.subscriber = this.myService.deleteUser()
        .subscribe(() => {
          console.log("deleted succ");
        },
          (error) => {
            console.log(error);
          }
        )
    }
  }

  /* upload Image */
  private baseURL: string = "https://amnesia-skincare.herokuapp.com/api"
  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDMxYTM0NzI4MmQ4MDAwMTVmODczZjgiLCJpYXQiOjE2MTQ0NDE1NzV9.y3PBLeU1Y-SlAxmqVKjTiT8BMnbVPEIgFy8hs7VHiRA'
  selectedFile2: File = null
  onFileSelected(event) {
    console.log(event);
    this.selectedFile2 = <File>event.target.files[0]
  }
  onUpload(event) {
    // console.log(event);
    this.selectedFile2 = <File>event.target.files[0]
    console.log("uploaded")
    this.isFetchingImg = true
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/json',
        'Authorization': this.token
      })
    }
    const fd = new FormData();
    fd.append('image', this.selectedFile2, this.selectedFile2.name)
    console.log(fd);
    this.http.post(`${this.baseURL}/images/user/`, fd, httpOptions)
      .subscribe(res => {
        this.isFetchingImg = false
        console.log(res)
        this.reloadComponent()
      },
        (err) => {
          console.log(err);
        })
  }

  /* reload existing component */
  reloadComponent() {
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
    }

  /*oninit*/
  ngOnInit(): void {
    this.showProfile()
  }

  /*destroy*/
  ngOnDestroy(): void {
    // this.subscriber.unsubscribe();
  }

}

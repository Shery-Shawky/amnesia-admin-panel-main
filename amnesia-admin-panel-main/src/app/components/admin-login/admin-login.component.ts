import { AfterViewInit, Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl,FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  isLoad = "hide";
  loading = false;
  credentialsError="hide";
  userCredentials={};
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private userService: UsersService,) { 

    }
  ngOnInit(): void {
  }

  loginForm = new FormGroup({
    email: new FormControl('',[Validators.required,validateEmail]),
    password: new FormControl('',[Validators.required]),
  });
  get _form(){return this.loginForm.controls;}

  /************ */
  goLogin(){
    this.userCredentials = {
      "email":this._form.email.value,
      "password":this._form.password.value,
    }
    this.isLoad=""
    this.loading = true;
    this.userService.postLogin(this.userCredentials).subscribe(
      (res:any)=>{
        console.log(res)
        this.loading = false;
        this.isLoad="hide"
        if(res.success){
          localStorage.setItem('token',res.token);
          localStorage.getItem('token');
          this.router.navigate(['dashboard']);
        }
      },
      (err) =>{
        if(err.error.exists){
        }
        this.loading = false;
        this.isLoad = "hide";
        this.credentialsError="";
        this.loginForm.controls['password'].setValue("");
        console.log(err.error)
      });
  }
}
function validateEmail(c: FormControl) {
  let EMAIL_REGEXP = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  return EMAIL_REGEXP.test(c.value) ? null : {
    emailNotValid: true
  };
}

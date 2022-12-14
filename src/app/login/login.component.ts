import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthGuard } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  invalidLogin?: boolean;
  public loginForm: any ={};
  isLoggedIn:boolean = false;
  errorMessage = '';


  url = 'https://localhost:44337/api/employee/'

  constructor(private router: Router, private authService:AuthGuard,private formbuilder: FormBuilder,private http: HttpClient,private jwtHelper : JwtHelperService) { }

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      email: [''],
      password: ['', Validators.required]
    })
  }
  
  login():void{
    this.authService.login(this.loginForm).subscribe(
      data=>{
        this.isLoggedIn = true;
        this.authService.isUserLoggedIn = this.isLoggedIn;
        this.router.navigate(['/employee']);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoggedIn = false;
      }
    )
    }


    // const credentials = JSON.stringify(form.value);
    // this.http.post(this.url +"login", credentials, {
    //   headers: new HttpHeaders({
    //     "Content-Type": "application/json"
    //   })
    // }).subscribe(response => {
    //   const token = (<any>response).token;
    //   localStorage.setItem("jwt", token);
    //   this.invalidLogin = false;
    //   this.router.navigate(["/GetEmployee"]);
    // }
//);
}
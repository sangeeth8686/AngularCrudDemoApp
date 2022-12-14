import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from '../auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthGuard, private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.authService.register(this.form).subscribe({
      next:(data) => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        window.alert("SignUp Successfull. Login to Continue");
        this.router.navigate(['/login']);
      },
      error : (err:any)=> {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }}
    );
  }

}

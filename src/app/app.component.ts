import { IfStmt, ThisReceiver } from '@angular/compiler';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthGuard } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private jwtHelper: AuthGuard, private router: Router) {
  } 
  
  title = 'AngularCrudDemoApp';

  
  isUserAuthenticated() {
   if(this.jwtHelper.isUserLoggedIn){
      return true;
    }
    else {
      return false;
    }
  }

  
  LogIn() {
    this.router.navigate(['/login']);
  }
  
  public logOut = () => {
    this.jwtHelper.isUserLoggedIn = false;
    this.router.navigate(['']);
  }

  Register(){

  }
}


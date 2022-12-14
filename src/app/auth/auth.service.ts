import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from "rxjs";


@Injectable()
export class AuthGuard implements CanActivate{
    
    constructor(private jwtHelper: JwtHelperService, private router: Router, private http:HttpClient)
    {

    }
    redirectUrl: string;
    isUserLoggedIn: boolean;
    httpOptions = {headers: new HttpHeaders({'Content-Type':'application/json'})};

    login(credentials:any): Observable<any> {
        return this.http.post('https://localhost:44337/api/User/autenticate',{
            Email:credentials.Email,
            password: credentials.password
        },this.httpOptions);
    }

    register(user:any): Observable<any> {
        return this.http.post('https://localhost:44337/api/User/register', {
          Username: user.username,
          Email: user.Email,
          password: user.password,
          Name:user.name,
          Role:user.role
        }, this.httpOptions);
      }

    canActivate() {

        const token= localStorage.getItem("jwt");
        if(token && !this.jwtHelper.isTokenExpired(token))
        {
            return true;
        }
        this.router.navigate(["/login"]);
        return false;
    }
}
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatToolbarModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentComponent } from './department/department.component';
import { EmployeeComponent } from './employee/employee.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { JwtModule } from "@auth0/angular-jwt";
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth/auth.service';

const routes: Routes = [
  {path:'', component: HomeComponent,pathMatch:'full'},
  { path: 'register', component: RegisterComponent },
   { path: 'login', component: LoginComponent },
  {
    path:'employee', component: EmployeeComponent,
  },
  {
    path:'department', component:DepartmentComponent
  },
];

export function tokenGetter() {
  return localStorage.getItem("jwt");
}

@NgModule({
  imports: [  
     MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    RouterModule.forRoot(routes),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:7299"],
        disallowedRoutes: []
      }
  }),
  ],
  exports: [RouterModule,]
})
export class AppRoutingModule { }

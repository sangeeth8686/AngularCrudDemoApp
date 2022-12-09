import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DepartmentComponent } from './department/department.component';
import { AddEditDepartmentComponent } from './department/add-edit-department/add-edit-department.component';
import { ShowDepartmentComponent } from './department/show-department/show-department.component';
import { EmployeeComponent } from './employee/employee.component';
import { AddEditEmployeeComponent } from './employee/add-edit-employee/add-edit-employee.component';
import { ShowEmployeeComponent } from './employee/show-employee/show-employee.component';
import { ApiService } from './apiservice.service';
import { FormsModule } from '@angular/forms';
import {HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    DepartmentComponent,
    AddEditDepartmentComponent,
    ShowDepartmentComponent,
    EmployeeComponent,
    AddEditEmployeeComponent,
    ShowEmployeeComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }

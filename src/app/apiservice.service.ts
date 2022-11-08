import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  readonly apiurl = 'https://localhost:44337/api/' ;
  httpOptions = {headers: new HttpHeaders({'Content-Type':'application/json'})};


  constructor(private httpClient: HttpClient) { }

  //Department
  getDepartmentsList(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiurl+'Department/GetDepartment');
  }

  addDepartment(dept:any):Observable<any> {
    return this.httpClient.post<any>(this.apiurl+'Department/AddDepartment',dept,this.httpOptions);
  }

  updateDepartment(id:any, dept:any): Observable<any>{
    return this.httpClient.put<any>(this.apiurl+'Department/UpdateDepartment/'+id,dept,this.httpOptions);
  }

  deleteDepartment(deptId:any):Observable<any>{
    return this.httpClient.delete<any>(this.apiurl+'Department/DeleteDepartment?id='+deptId,this.httpOptions);
  }

  getAllDepartmentNames(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiurl + 'employee/GetAllDepartmentNames');
  }

  //Employee
  getEmployeeList():Observable<any>{
    return this.httpClient.get<any[]>(this.apiurl+'Employee/GetEmployee')
  }

  addEmployee(emp:any):Observable<any>{
    return this.httpClient.post(this.apiurl+'Employee/AddEmployee',emp,this.httpOptions);
  }

  updateEmployee(empId:any, emp: any): Observable<any> {
    return this.httpClient.put<any>(this.apiurl + 'Employee/UpdateEmployee/'+empId, emp, this.httpOptions);
  }

  deleteEmployee(empId: number): Observable<number> {
    return this.httpClient.delete<number>(this.apiurl + 'Employee/DeleteEmployee?id=' + empId, this.httpOptions);
  }
  
}

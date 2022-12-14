import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  readonly apiurl = 'https://localhost:44337/api/' ;
  httpOptions = {headers: new HttpHeaders({'Content-Type':'application/json'})};
  constructor(private httpClient: HttpClient) { }

  private handleError<T>(result = {} as T) {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(error);
      return of(result);
    };
  }
  //Department
  getDepartmentsList(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiurl+'Department/GetDepartment').pipe(tap(departments => console.log("departments: " + JSON.stringify(departments))),
    catchError(this.handleError<any[]>([]))
  );;
  }

  getDepartmentById(deptId:any): Observable<any>{
    return this.httpClient.get<any>(this.apiurl+'Department/GetDepartment'+deptId,this.httpOptions);
  }

  addDepartment(dept:any):Observable<any> {
    return this.httpClient.post<any>(this.apiurl+'Department/AddDepartment',dept,this.httpOptions)
    .pipe(tap(departments => console.log("employees: " + JSON.stringify(departments))),
      catchError(this.handleError<any[]>([]))
    );;
  }

  updateDepartment( dept:any): Observable<any>{
    return this.httpClient.put<any>(this.apiurl+'Department/UpdateDepartment',dept,this.httpOptions);
  }

  deleteDepartment(deptId:any):Observable<any>{
    return this.httpClient.delete<any>('https://localhost:44337/api/Department/DeleteDepartment/'+deptId,this.httpOptions);
  }

  getAllDepartmentNames(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiurl + 'employee/GetAllDepartmentNames');
  }

  //Employee
  getEmployeeList():Observable<any>{
    return this.httpClient.get<any[]>(this.apiurl+'employee/GetEmployee')
    
  }
  //login
  Login():Observable<any>{
    return this.httpClient.get<any[]>(this.apiurl+'employee/login')
    
  }

  addEmployee(emp:any):Observable<any>{
    return this.httpClient.post(this.apiurl+'employee/AddEmployee',emp,this.httpOptions);
  }

  updateEmployee(empId:any, emp: any): Observable<any> {
    return this.httpClient.put<any>(this.apiurl + 'Employee/UpdateEmployee/'+empId, emp, this.httpOptions);
  }

  deleteEmployee(empId: number): Observable<number> {
    return this.httpClient.delete<number>(this.apiurl + 'Employee/DeleteEmployee?id=' + empId, this.httpOptions);
  }
}

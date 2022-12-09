import { IfStmt } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/apiservice.service';

@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.css']
})
export class AddEditEmployeeComponent implements OnInit {

  constructor(private service: ApiService) { }
  @Input() emp: any;
  EmployeeId = "";
  EmployeeName = "";
  Department = "";
  DateOfJoining = "";
  DepartmentList: any = [];


  ngOnInit(): void {
    this.loadEmployeeList();
  }

  loadEmployeeList() {

    this.service.getAllDepartmentNames().subscribe((data: any) => {
      this.DepartmentList = data;

      this.EmployeeId = this.emp.employeeID;
      this.EmployeeName = this.emp.employeeName;
      this.Department = this.emp.department;
      this.DateOfJoining = this.emp.doj;
    });
  }

  addEmployee() {
    var val = {
      EmployeeId: this.EmployeeId,
      EmployeeName: this.EmployeeName,
      Department: this.Department,
      DateOfJoining: this.DateOfJoining,
    };

    this.service.addEmployee(val).subscribe(res => {
      //console.log(res);
      //alert(res.toString());
      window.alert("Updated");
      close();
    });
  }

  updateEmployee() {
    var val = {
      EmployeeId: this.EmployeeId,
      EmployeeName: this.EmployeeName,
      Department: this.Department,
      DateOfJoining: this.DateOfJoining,
    };

  this.service.updateEmployee(val.EmployeeId,val).subscribe(res =>
    {
      alert("Updated");
    });
    
  }
}
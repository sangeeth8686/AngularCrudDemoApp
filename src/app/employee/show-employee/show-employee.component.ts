import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/apiservice.service';

@Component({
  selector: 'app-show-employee',
  templateUrl: './show-employee.component.html',
  styleUrls: ['./show-employee.component.css']
})
export class ShowEmployeeComponent implements OnInit {

  constructor(private service: ApiService) { }

  EmployeeList: any = [];
  ModalTitle = "";
  ActivateAddEditEmpComp: boolean = false;
  emp: any;

  ngOnInit(): void {
    this.refreshEmpList();
  }

  addClick() {
    this.emp = {
      EmployeeId: "0",
      EmployeeName: "",
      Department: "",
      DateOfJoining: "",
    }
    this.ModalTitle = "Add Employee";
    this.ActivateAddEditEmpComp = true;
  }

  editClick(item: any) {
    this.emp = item;
    this.ModalTitle = "Edit Employee";
    this.ActivateAddEditEmpComp = true;
  }

  deleteClick(item: any) {
    if (confirm('Are you sure??')) {
      this.service.deleteEmployee(item.employeeID).subscribe(data => {
        alert(data.toString());
        this.refreshEmpList();
      })
    }
  }

  closeClick() {
    this.ActivateAddEditEmpComp = false;
    this.refreshEmpList();
  }

  refreshEmpList() {
    this.service.getEmployeeList().subscribe(data => {
      //console.log(data);

      this.EmployeeList = data;
    });
  }
}
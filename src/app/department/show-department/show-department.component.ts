import { Component, OnInit } from '@angular/core';
import { groupBy } from 'rxjs';
import { ApiService } from 'src/app/apiservice.service';

@Component({
  selector: 'app-show-department',
  templateUrl: './show-department.component.html',
  styleUrls: ['./show-department.component.css']
})
export class ShowDepartmentComponent implements OnInit {

  constructor(private service: ApiService) { }

  DepartmentList: any[]= [];
  ModalTitle = "";
  ActivateAddEditDepartComp: boolean = false;
  depart: any;

  DepartmentIdFilter = "";
  DepartmentNameFilter = "";
  DepartmentListWithoutFilter: any = [];
  EmployeeList: any[]=[];

  ngOnInit(): void {
    this.refreshDepList();
  }

  addClick() {
    this.depart = {
      DepartmentId: "0",
      DepartmentName: ""
    }
    this.ModalTitle = "Add Department";
    this.ActivateAddEditDepartComp = true;
  }

  editClick(item: any) {
    this.depart = item;
    this.ModalTitle = "Edit Department";
    this.ActivateAddEditDepartComp = true;
  }

  deleteClick(item: any) {
    if (confirm('Are you sure??')) {
      this.service.deleteDepartment(item.departmentId).subscribe(data => {
        alert(data.toString());
        this.refreshDepList();
      })
    }
  }

  closeClick() {
    this.ActivateAddEditDepartComp = false;
    this.refreshDepList();
  }


  refreshDepList() {

    // this.service.getEmployeeList().subscribe(data=>{
    //   this.EmployeeList= data;
    // });
    this.service.getDepartmentsList().subscribe(data => {
      //console.log(data);
      this.DepartmentList = data;
      this.DepartmentListWithoutFilter = data;
      // @ts-ignore
    // const res = this.DepartmentList.filter(emp => {
    //   this.EmployeeList.some(dep => emp.departmentId == dep.employeeID)}
    //   );
    //    console.log(res);
    // });
    });
  }

  groupEmployeesByDept():any {
    let empCount = typeof(this.DepartmentList);
//console.log(empCount);
  }
}
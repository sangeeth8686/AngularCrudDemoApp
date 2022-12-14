import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../auth/auth.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private authService: AuthGuard) { }

  ngOnInit(): void {
    this.authService.isUserLoggedIn;

  }

}

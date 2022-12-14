import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../auth/auth.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  constructor(private authService: AuthGuard) { }

  ngOnInit(): void {
    this.authService.isUserLoggedIn;
  }

}

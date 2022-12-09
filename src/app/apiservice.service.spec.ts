import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ApiService } from './apiservice.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;
  const mockDepartment: any = {
    DepartmentId:1,
    DepartmentName:'sam'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [ApiService]

    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to retrieve departments from the API GET', () => {
    const dummyDepartment: any[] = [{
      departmentID:1,
      departmentName:'IT'
    }];
    service.getDepartmentsList().subscribe(department => {
        expect(department.length).toBe(1);
        expect(department).toEqual(dummyDepartment);
    });
    const request = httpMock.expectOne( `${service.apiurl}Department/GetDepartment`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyDepartment);
  });

  it('should turn 404 error into an empty department result', () => {
    service.getDepartmentsList().subscribe(department =>
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404);
        expect(error.error).toContain('404 error');
      }
    );
    const request = httpMock.expectOne( `${service.apiurl}Department/GetDepartment`);
    const msg = '404 error';
    request.flush(msg, { status: 404, statusText: 'Not Found' }); //Return error

  });


  it('should call updateDepartment and return the updated department from the API', () => {
    const updateDepartment: any = {
      DepartmentId:1,
      DepartmentName:'sam'
    };
   
    service.updateDepartment(mockDepartment).subscribe((data) => {
      expect(data).toEqual(updateDepartment);
    });

    const req = httpMock.expectOne({
      method: 'PUT',
      url: `${service.apiurl}Department/UpdateDepartment`,
    });
    expect(req.request.method).toBe('PUT');

    req.flush(updateDepartment);
  });

  it('should call delete and delete the department', () => {
		// Arrange
    const id = 1;
		// Act
    service.deleteDepartment(id).subscribe((data) => {
	  // Assert
      expect(data).toBe(id);
    });
    const req = httpMock.expectOne({
      method: 'DELETE',
      url: `${service.apiurl}Department/DeleteDepartment/`+id,
    });
    expect(req.request.method).toBe('DELETE');
    req.flush(id);
  });

  afterEach(() => {
    httpMock.verify();
  });

})
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { delay } from 'rxjs';
import { ApiService } from 'src/app/apiservice.service';
import * as Rx from 'rxjs';
import { ShowDepartmentComponent } from './show-department.component';

describe('ShowDepartmentComponent', () => {
  let component: ShowDepartmentComponent;
  let fixture: ComponentFixture<ShowDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientModule],
      declarations: [ ShowDepartmentComponent ],
      providers: [{provide: HttpClient}],

    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call refreshDepList method in ngoninit',() => {
    const refreshListSpy = spyOn(component,'refreshDepList');
    component.ngOnInit();
    expect(component.refreshDepList).toHaveBeenCalled();
  });

  it('should return ActivateAddEditDepartComp to true when Addclick is called',() => {
    component.ActivateAddEditDepartComp = false;
    component.addClick();
    expect(component.ActivateAddEditDepartComp).toBe(true);
  });

  it('should return ActivateAddEditDepartComp to true when Editclick is called',() => {
    component.ActivateAddEditDepartComp = false;
    let depart = {
      DepartmentId: "1",
      DepartmentName: "IT"
    }
    component.editClick(depart);
    expect(component.ActivateAddEditDepartComp).toBe(true);
  });

  it('should call getEmployeeList and get response as empty array', fakeAsync(() => {
    const fixture = TestBed.createComponent(ShowDepartmentComponent);
    const component = fixture.debugElement.componentInstance;
    const service = fixture.debugElement.injector.get(ApiService);
    let spy_getEmployees = spyOn(service,"getEmployeeList").and.callFake(() => {
      return Rx.of([]).pipe(delay(100));
    });
    let spy_Departments = spyOn(service,"getDepartmentsList").and.callFake(()=> {
    return Rx.of([]).pipe(delay(100));
    });
    component.refreshDepList();
    tick(100);
    expect(component.DepartmentList).toEqual([]);
  }));

  it('should call getEmployeeList and get response as array', fakeAsync(() => {
    const fixture = TestBed.createComponent(ShowDepartmentComponent);
    const component = fixture.debugElement.componentInstance;
    const service = fixture.debugElement.injector.get(ApiService);
    let spy_getEmployees = spyOn(service,"getEmployeeList").and.callFake(() => {
      return Rx.of([]).pipe(delay(100));
    });
    let spy_Departments = spyOn(service,"getDepartmentsList").and.callFake(()=> {
    return Rx.of([{departmentId:1}]).pipe(delay(100));
    });
    component.refreshDepList();
    tick(100);
    expect(component.DepartmentList).toEqual([{departmentId:1}]);
  }));

});

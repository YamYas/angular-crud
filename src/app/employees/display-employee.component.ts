import { EmployeeService } from './employee.service';
import { Employee } from './../models/employee.model';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css']
})
export class DisplayEmployeeComponent implements OnInit, OnChanges {
//  private _employeeId : number
//   @Input() 
//   set employeeId(val : number){
//     // console.log('employeeId changed from  : '+ JSON.stringify(this._employeeId) + ' to '+ JSON.stringify(val));

//     this._employeeId = val;
//   }
//   get employeeId():number{

//     return this._employeeId
//   }

//   private _employee: Employee;

//   @Input() 
//   set employee(val:Employee){
//     // console.log('employee changed from  : '+ JSON.stringify(this._employee) + ' to '+ JSON.stringify(val));

//     // console.log('Previous : '+ (this._employee ? this._employee.name : 'NULL'));
//     // console.log('Cureent : '+ val.name)
//     this._employee = val
//   }
//   get employee(): Employee{
    
//     return this._employee
//   }
public _selectedEmployeId:number
  @Input() employee: Employee;
  @Input() searchTerm : string;
  @Output() notify: EventEmitter<Employee> = new EventEmitter<Employee>();
  @Output() notifyDelete : EventEmitter<number> = new EventEmitter<number>();
  confirmDelete = false;
  // panelExpanded = true;
  // isHidden = false;
  constructor(private _employeeService: EmployeeService, private _route : ActivatedRoute, private _router : Router) { }

  ngOnInit() {
    this._selectedEmployeId = +this._route.snapshot.paramMap.get('id');
  }

  handleClick(){
    this.notify.emit(this.employee);
  }

  ngOnChanges(changes: SimpleChanges){
    // console.log(changes)
    // const previousEmployee = <Employee>changes.employee.previousValue;
    // const currentEmployee = <Employee>changes.employee.currentValue;

    // console.log('previous : '+ (previousEmployee ? previousEmployee.name : 'NULL'));
    // console.log('Current : '+ currentEmployee.name);

    // for(const propName of Object.keys(changes)){
    //   // console.log(propName)
    //   const change = changes[propName];
    //   const from = JSON.stringify(change.previousValue);
    //   const to = JSON.stringify(change.currentValue);
    //   console.log(propName + ' Changed from '+ from + ' to '+ to);
    // }
  }
  getEmployeeNameAndGender() : string{
    return this.employee.name + ' ' + this.employee.gender
  }

  viewEmployee(){
    this._router.navigate(['/employees',this.employee.id],{
      queryParams:{'searchTerm':this.searchTerm}
    })
  }
  

  
  editEmployee(){
    this._router.navigate(['/edit',this.employee.id])
  }

  deleteEmployee(){
    this._employeeService.deleteEmployee(this.employee.id).subscribe(
      ()=>console.log(`Employee with Id = ${this.employee.id} deleted`),
      (err) => console.log(err)
    );
    this.notifyDelete.emit(this.employee.id)
  }
}

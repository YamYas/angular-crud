import { ResolvedEmployeeList } from './resolve-employeelist.model';

import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from './employee.service';
import { Employee } from './../models/employee.model';
import { Component, OnInit } from '@angular/core';
import { resolve } from 'q';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {

  employees: Employee[];
  filteredEmployees : Employee[]; 
  dataFromChild: Employee;
  private _searchTerm:string;
  error = '';

  get searchTerm():string{
    return this._searchTerm;
  }

  set searchTerm(value:string){
    this._searchTerm = value;
    this.filteredEmployees = this.filtereEmployees(value);
  }
  // employeeToDisplay : Employee;
  // private arrayIndex = 1;

  constructor(private _employeeService: EmployeeService, private _router:Router, private _route : ActivatedRoute) { 
    // this.employees = this._route.snapshot.data['employeeList'];
    const resolvedEmployeeList: ResolvedEmployeeList = this._route.snapshot.data['employeeList'];
    console.log(resolvedEmployeeList)
    if(resolvedEmployeeList.error == null){
      this.employees = resolvedEmployeeList.employeeList
    }else{
      this.error = resolvedEmployeeList.error
    }  
    if(this._route.snapshot.queryParamMap.has('searchTerm')){
        this.searchTerm = this._route.snapshot.queryParamMap.get('searchTerm');
      }else{
        this.filteredEmployees = this.employees;
        console.log('Else Block : '+ new Date().toTimeString())
      }
  }

  ngOnInit() {
  //  this.employees =  this._employeeService.getEmployees();
  //  this._employeeService.getEmployees().subscribe((empList) =>{
  //   this.employees = empList;
  //   console.log('Subscribe : '+ new Date().toTimeString())
  //   if(this._route.snapshot.queryParamMap.has('searchTerm')){
      
  //     this.searchTerm = this._route.snapshot.queryParamMap.get('searchTerm');
  //   }else{
  //     this.filteredEmployees = this.employees;
  //     console.log('Else Block : '+ new Date().toTimeString())
  //   }
  //  } );
  //  this.filteredEmployees = this.employees;
  //  this.employeeToDisplay =  this.employees[0];
  // console.log(this._route.snapshot.queryParamMap.has('searchTerm'));
  // console.log(this._route.snapshot.queryParamMap.get('searchTerm'));
  // console.log(this._route.snapshot.queryParamMap.getAll('searchTerm'));
  // console.log(this._route.snapshot.queryParamMap.keys);

}

  // nextEmployee() : void {
  //   if(this.arrayIndex <=2 ){
  //     this.employeeToDisplay = this.employees[this.arrayIndex];
  //     this.arrayIndex++;
  //   }else{
  //     this.employeeToDisplay = this.employees[0];
  //     this.arrayIndex = 1;
  //   }
  // }
  handleNotify(eventData: Employee){
    this.dataFromChild = eventData
  }

  // onClick(employeeId : number){
  //   this._router.navigate(['/employees', employeeId],{
  //     queryParams:{'searchTerm':this.searchTerm, 'testParams':'testValue'}
  //   })
  // }

  // changeEmployeeName(){
  //   this.employees[0].name = 'yasin';
  //   this.filteredEmployees = this.filtereEmployees(this.searchTerm)
  //   // const newEmployeeArray :Employee[] = Object.assign([], this.employees);
  //   // newEmployeeArray[0].name = 'yasin';
  //   // this.employees = newEmployeeArray
  // }
  // onMouseMove(){

  // }
  filtereEmployees(searchString : string){
    return this.employees.filter(employee => 
      employee.name.toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1);

  }

  onDeleteNotification(id:number){
    const i = this.filteredEmployees.findIndex(e=>e.id === id);
    if(i !== -1){
      this.filteredEmployees.splice(i, 1);
    }
  }
}

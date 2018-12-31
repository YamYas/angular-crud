import { Employee } from './../models/employee.model';
import { EmployeeService } from './employee.service';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  private _id:number;
  employee: Employee;
  constructor(private _router : Router, private _route : ActivatedRoute, private _employeeService: EmployeeService) { }

  ngOnInit() {
    // this._id = +this._route.snapshot.paramMap.get('id');
    this._route.paramMap.subscribe(params =>{
      this._id = +params.get('id'); 
      this._employeeService.getEmployee(this._id).subscribe(
        
        (employee) => 
        {
          this.employee = employee;
          console.log(employee)
        },
        (error:any) => console.log(error)
      );
    })
    console.log(this.employee)
  }
  viewNextEmployee(){
    if(this._id < 3){
      this._id=this._id+1;
    }else{
      this._id = 1;
    }
    this._router.navigate(['/employees', this._id],{
      queryParamsHandling: 'preserve'
    })
  }



}

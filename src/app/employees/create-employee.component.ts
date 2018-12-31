import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from './employee.service';
import { Department } from './../models/department.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker/bs-datepicker.config';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
 @ViewChild('employeeForm') public createEmployeeFrom : NgForm;
  // gender='male'; // male radio button checked by default
  // isActive = true; // checked the checkbox by default
  // department = '3' // selected dropdown value
  // dateOfBirth : Date = new Date(2018, 0, 30);
  panelTitle : string;
  employee: Employee = {
    id: null,
    name: null,
    gender: null,
    email: null,
    phoneNumber: null,
    contactPreference: null,
    dateOfBirth: null,
    department: 'select',
    isActive: null,
    photoPath: null,
    password:null,
    confirmPassword:null
  }
  prviewPhoto = false;
  datePickerConfig: Partial<BsDatepickerConfig>
  departments : Department[] = [
    { id: 1, name: 'Help Desk'},
    { id: 2, name: 'HR'},
    { id: 3, name: 'IT'},
    { id: 4, name: 'Payroll'},
    { id: 5, name: 'Admin'}
  ]
  constructor(private _employeeService:EmployeeService, private _router:Router, private _route:ActivatedRoute) { 
    this.datePickerConfig = Object.assign({}, 
      {
        containerClass:'theme-dark-blue', 
        // showWeekNumbers: false,
        // minDate: new Date(2018, 0, 1),
        // maxDate: new Date(2018, 11, 25),
        dateInputFormat:'DD/MM/YYYY',

      });
  }

  ngOnInit() {
    this._route.paramMap.subscribe(prameterMap =>{
      const id = +prameterMap.get('id');
      this.getEmployee(id)
    })
  }
private getEmployee(id:number){
  if(!this._route.snapshot.paramMap.has('id')){
    this.employee =  {
      id: null,
      name: null,
      gender: null,
      email: null,
      phoneNumber: null,
      contactPreference: null,
      dateOfBirth: null,
      department: 'select',
      isActive: null,
      photoPath: null,
      password:null,
      confirmPassword:null
    }
    this.panelTitle = 'Create Employee'
    this.createEmployeeFrom.reset();
  }else{
    this.panelTitle = 'Update Employee';
    this._employeeService.getEmployee(id).subscribe(
      (employee) => this.employee = employee,
      (error:any) => console.log(error)
    );
  }
}
  // saveEmployee(empForm: NgForm):void{
  //   console.log(empForm.value)
  // }

  // saveEmployee(newEmployee: Employee):void{
  //   console.log(newEmployee);
  // }

  // saveEmployee(empForm : NgForm):void{
  //   const newEmployee : Employee = Object.assign({}, this.employee)
  //   this._employeeService.save(newEmployee);
  //   // empForm.reset();
  //   this.createEmployeeFrom.reset();
  //   // this.createEmployeeFrom.reset({
  //   //   name : 'Name',
  //   //   contactPreference : 'phone'
  //   // });
  //   this._router.navigate(['list']);
  // }


  saveEmployee(empForm : NgForm):void{
    if(this.employee.id == null){
    this._employeeService.addEmployee(this.employee).subscribe(
      (data:Employee)=>{
        console.log(data)
        this.createEmployeeFrom.reset();
        this._router.navigate(['list']);
      },
      (error: any)=>{
        console.log(error)
      }
    );
    }else{
      this._employeeService.updateEmployee(this.employee).subscribe(
        ()=>{
          this.createEmployeeFrom.reset();
          this._router.navigate(['list']);
        },
        (error: any)=>{
          console.log(error)
        }
      );
    }
  }

  togglePhotoPreview(){
    this.prviewPhoto = !this.prviewPhoto
  }
}
